import { Module } from '@nestjs/common';
import { ChimeService } from './chime.service';
import { ChimeController } from './chime.controller';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [ChimeService],
  controllers: [ChimeController],
})
export class ChimeModule {}
