import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(8080)
export class AppService {
  @SubscribeMessage('offer')
  handleOffer(@MessageBody() data: any): any {
    console.log(data);
    // TODO emit offer from emitter to receiver
    return {
      target: 'receiver',
      data: data,
    };
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() data: any): any {
    console.log(data);
    // TODO emit answer from receiver to emitter
    return {
      target: 'emitter',
      data: data,
    };
  }
}
