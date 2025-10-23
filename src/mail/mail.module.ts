import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AppMailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        transport: {
          host: cfg.get<string>('MAIL_HOST'),
          port: cfg.get<number>('MAIL_PORT'),
          secure: false, // 465 = true, 587/25 = false
          auth: {
            user: cfg.get<string>('MAIL_USER'),
            pass: cfg.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: cfg.get<string>('MAIL_FROM'),
        },
        template: {
          // aponta para o diretório compilado
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
  providers: [AppMailService],
  exports: [AppMailService],
})
export class MailModule {}
