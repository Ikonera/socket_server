import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChimeModule } from './chime/chime.module';
import {ConfigModule} from "@nestjs/config";
import config from "./config/config"

@Module({
  imports: [
      ChimeModule,
      ConfigModule.forRoot({
        load: [config]
      })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
