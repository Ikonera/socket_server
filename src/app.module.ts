import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChimeModule } from './chime/chime.module';

@Module({
  imports: [ChimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
