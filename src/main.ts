import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { DelayInterceptor } from '@/common/interceptors/delay.interceptor';
import { ResponseTransformInterceptor } from '@/common/interceptors/response-transform.interceptor';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get<string>('HOST');
  const port = configService.get<number>('PORT');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalInterceptors(new DelayInterceptor(100), new ResponseTransformInterceptor());
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Agora API')
    .setDescription('API documentation for the Agora project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(port, host);
  logger.log(`Application running at: ${await app.getUrl()}`);
}

bootstrap();
