import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AppMailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        transport: {
          host: cfg.get<string>('MAIL_HOST') || 'smtp.office365.com',
          port: Number(cfg.get('MAIL_PORT') ?? 587),
          secure: false,
          requireTLS: true,
          auth: {
            user: cfg.get<string>('MAIL_USER'),
            pass: cfg.get<string>('MAIL_PASS'),
          },
          tls: {
            minVersion: 'TLSv1.2',
            servername: 'smtp-mail.outlook.com',
          },
        },
        defaults: {
          from: cfg.get<string>('MAIL_FROM') || cfg.get<string>('MAIL_USER'),
        },
        template: {
          dir: join(process.cwd(), 'src', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [AppMailService],
  exports: [AppMailService],
})
export class MailModule {}
