import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketController } from './websocket.controller';
import {AppService} from "../app.service";

@Module({
  providers: [WebsocketService, AppService],
  controllers: [WebsocketController]
})
export class WebsocketModule {}
