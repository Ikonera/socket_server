import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost'],
  });
  app.useWebSocketAdapter(new WsAdapter(app)); // REQUIRED
  await app.listen(4600);
}
bootstrap();
