import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';
import { ConsoleModule } from 'nestjs-console';
import { DelayInterceptor } from './interceptors/delay.interceptor';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalInterceptors(new DelayInterceptor(2000), new ResponseTransformInterceptor());
  app.connectMicroservice(ConsoleModule);
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
