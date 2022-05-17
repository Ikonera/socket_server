import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(8080)
export class AppService {
  @SubscribeMessage('webrtc')
  handleMessage(@MessageBody() data: string): string {
    console.log(data);
    return 'hello from server';
  }
}
