import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3010'],
    allowedHeaders: [
        "Access-Control-Allow-Origin",
		"Content-Type",
    ]
  });
  await app.listen(4600);
}
bootstrap();
