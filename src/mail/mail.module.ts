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
      useFactory: (cfg: ConfigService) => {
        const authType = (
          cfg.get<string>('MAIL_AUTH_TYPE') ?? 'basic'
        ).toLowerCase();
        if (authType === 'basic') {
          const secure = String(cfg.get('MAIL_SECURE') ?? 'true') === 'true';
          const port = Number(cfg.get('MAIL_PORT') ?? (secure ? 465 : 587));
          return {
            transport: {
              host: cfg.get<string>('MAIL_HOST') || 'smtp.gmail.com',
              port,
              secure,
              requireTLS: !secure,
              auth: {
                user: cfg.get<string>('MAIL_USER'),
                pass: cfg.get<string>('MAIL_PASS'),
              },
              tls: {
                minVersion: 'TLSv1.2',
              },
            },
            defaults: {
              from:
                cfg.get<string>('MAIL_FROM') || cfg.get<string>('MAIL_USER'),
            },
            template: {
              dir: join(process.cwd(), 'src', 'mail', 'templates'),
              adapter: new HandlebarsAdapter(),
              options: { strict: true },
            },
          };
        }

        // ===== Gmail via OAuth2 (opcional) =====
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              type: 'OAuth2',
              user: cfg.get<string>('MAIL_USER'),
              clientId: cfg.get<string>('OAUTH_CLIENT_ID'),
              clientSecret: cfg.get<string>('OAUTH_CLIENT_SECRET'),
              refreshToken: cfg.get<string>('OAUTH_REFRESH_TOKEN'),
            },
            tls: { minVersion: 'TLSv1.2' },
          },
          defaults: {
            from: cfg.get<string>('MAIL_FROM') || cfg.get<string>('MAIL_USER'),
          },
          template: {
            dir: join(process.cwd(), 'src', 'mail', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: { strict: true },
          },
        };
      },
    }),
  ],
  controllers: [MailController],
  providers: [AppMailService],
  exports: [AppMailService],
})
export class MailModule {}
