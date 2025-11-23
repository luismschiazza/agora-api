import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { DelayInterceptor } from './interceptors/delay.interceptor';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get<string>('HOST');
  const port = configService.get<number>('PORT');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalInterceptors(new DelayInterceptor(2000), new ResponseTransformInterceptor());
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(port, host);
  logger.log(`🚀 Application running at: ${await app.getUrl()}`);
}

bootstrap();
