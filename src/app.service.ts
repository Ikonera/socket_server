import {Injectable} from "@nestjs/common";
import {createWorker, observer} from "mediasoup";

@Injectable()
export class AppService {

	initiateMeeting = async () => {
		const worker = await createWorker({
			logLevel: "warn",
			logTags: ["info"],
			rtcMaxPort: 11000,
		})

		observer.on("newworker", worker => {
			console.log("[MediaSoup] New worker : [pid: %s]", worker.pid)
		})

		const mediaCodecs = [{
			kind: "audio",
			mimeType: "audio/opus",
			clockRate: 48000,
			channels: 2
		}, {
			kind: "video",
			mimeType: "video/H264",
			clockRate: 90000,
			parameters: {
				"packetization-mode"      : 1,
				"profile-level-id"        : "42e01f",
				"level-asymmetry-allowed" : 1
				}
		}]

		// @ts-ignore
		const router = await worker.createRouter({ mediaCodecs })

		worker.on("died", error => {
			console.log("[MediaSoup] Worker [%s] dying error : %s", [worker.pid, error])
		})
		worker.observer.on("newrouter", router => {
			console.log("[MediaSoup] Worker [%s] new router created : %s", [worker.pid, router.id])
		})

		const webrtcTransport = await router.createWebRtcTransport({
			listenIps: ["127.0.0.1"],
			enableUdp: true,
			enableSctp: false,
			enableTcp: true,
			preferUdp: true,
		})

		await webrtcTransport.connect({
			dtlsParameters: {
				role: "server",
				fingerprints: webrtcTransport.dtlsParameters.fingerprints
			}
		})

		console.log("[MediaSoup] Transport ID : ", webrtcTransport.id)
		console.log("[MediaSoup] ICE Candidates : ", webrtcTransport.iceCandidates)
		console.log("[MediaSoup] ICE Parameters : ", webrtcTransport.iceParameters)
		console.log("[MediaSoup] DTLS Parameters : ", webrtcTransport.dtlsParameters)

		router.observer.on("newtransport", transport => {
			console.log("[MediaSoup] Router [%s] added transport : %s", [router.id, transport.id])
		})

		router.on("workerclose", () => {
			console.log("[MediaSoup] Router [%s] closed due to Worker [%s] closed : %s", [router.id, worker.pid])
		})

		const createProducer = async (params) => {
			return await webrtcTransport.produce(params)
		}

		const createConsumer = async (params) => {
			try {
				console.log("[MediaSoup] Consumer params : ", params)
				return await webrtcTransport.consume(params)
			}
			catch (e) {
				console.log("[MediaSoup - error] Error : ", e)
			}
		}

		const canConsume = async (producerId, rtpCapabilities) => {
			return router.canConsume({ producerId, rtpCapabilities})
		}

		webrtcTransport.observer.on("newproducer", producer => {
			console.log("[WebSocket] New producer : %s", producer.id)
		})

		webrtcTransport.observer.on("newconsumer", consumer => {
			console.log("[WeSocket] New consumer : ", consumer)
		})

		return {
			router,
			worker,
			webrtcTransport,
			createProducer,
			createConsumer,
			canConsume,
		}
	}

}
