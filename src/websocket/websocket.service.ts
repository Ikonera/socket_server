import {WebSocketGateway, SubscribeMessage, MessageBody} from "@nestjs/websockets";
import {AppService} from "../app.service";

@WebSocketGateway(40000, {
    transports: ["websocket"],
    cors: {
        origin: "http://localhost",
    },
})

export class WebsocketService {
    constructor(private readonly appService: AppService) {}

    @SubscribeMessage("event")
    async handleEvent(@MessageBody() data: any): Promise<any> {
        const { worker, router, webrtcTransport, createProducer, createConsumer, canConsume } = await this.appService.initiateMeeting()
        switch (data.type) {
            case "wantToConnect":
                const transportObj = {
                    id: webrtcTransport.id,
                    iceCandidates: webrtcTransport.iceCandidates,
                    iceParameters: webrtcTransport.iceParameters,
                    dtlsParameters: webrtcTransport.dtlsParameters,
                }
                console.log("[WebSocketService - handleEvent - wantToConnect] router id : %s", router.id)
                return {
                    type: "rtpCapabilities",
                    data: router.rtpCapabilities,
                    transport: transportObj
                }
            case "transport-connect":
                console.log("[WebSocketService - transport-connect] Message data : ")
                console.log(JSON.parse(data))
                break
            case "transport-produce":
                console.log("[WebSocketService - transport-produce] Message data : ")
                console.log(data)
                let producer = await createProducer(data.data)
                let consumer = await createConsumer({
                    producerId: producer.id,
                    rtpCapabilities: data.rtpCapabilities
                })
                await consumer.pause()
                console.log("[MediaSoup] Can consume : ", await canConsume(producer.id, data.rtpCapabilities))
                await consumer.resume()
                return producer.id
        }
        console.log("[WebSocketService - handleEvent] data : %s", data)
    }
}
