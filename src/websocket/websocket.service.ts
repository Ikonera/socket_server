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
        switch (data.type) {
            case "wantToConnect":
                const { router, transport } = await this.appService.initiateMeeting()
                const transportObj = {
                    id: transport.id,
                    iceCandidates: transport.iceCandidates,
                    iceParameters: transport.iceParameters,
                    dtlsParameters: transport.dtlsParameters,
                }
                console.log("[WebSocketService - handleEvent - wantToConnect] router id : %s", router.id)
                return {
                    type: "rtpCapabilities",
                    data: router.rtpCapabilities,
                    transport: transportObj
                }
        }
        console.log("[WebSocketService - handleEvent] data : %s", data)
    }
}
