import { Logger, ValidationPipe } from '@nestjs/common';
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

  /**
   * Enables dependency injection inside custom class-validator validators.
   */
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  /**
   * Registers the global validation pipeline.
   *
   * whitelist:
   * Removes properties that are not defined in DTOs.
   *
   * forbidNonWhitelisted:
   * Rejects requests containing unexpected properties.
   *
   * transform:
   * Automatically transforms payloads into DTO instances.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * Enables Cross-Origin Resource Sharing (CORS).
   */
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  /**
   * Sets the global API prefix.
   */
  app.setGlobalPrefix('api');

  /**
   * Registers global interceptors.
   *
   * The DelayInterceptor is enabled only during development
   * to simulate network latency.
   */
  const interceptors = [new ResponseTransformInterceptor()];

  if (process.env.NODE_ENV === 'development') {
    interceptors.unshift(new DelayInterceptor(100));
  }

  app.useGlobalInterceptors(...interceptors);

  /**
   * Configures the OpenAPI (Swagger) documentation.
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Agora API')
    .setDescription('API documentation for the Agora project')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(port, host);

  logger.log(`Application running at: ${await app.getUrl()}/api`);
}

bootstrap();
