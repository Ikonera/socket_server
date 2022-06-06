import { Injectable } from "@nestjs/common";
import { createWorker, observer } from "mediasoup";

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

		const router = await worker.createRouter()

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

		router.observer.on("newtransport", transport => {
			console.log("[MediaSoup] Router [%s] added Transport instance [%s]", [router.id, transport.id])
		})

		router.on("workerclose", () => {
			console.log("[MediaSoup] Router [%s] closed due to Worker [%s] closed : %s", [router.id, worker.pid])
		})

		return {
			router: router,
			worker: worker,
			transportId: webrtcTransport
		}
	}

}
