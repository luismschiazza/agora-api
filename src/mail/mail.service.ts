import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppMailService {
  constructor(private readonly mailer: MailerService) {}

  async sendWelcome(to: string, name?: string) {
    await this.mailer.sendMail({
      to,
      subject: 'Bem-vindo!',
      template:
        'Seja Bem-vindo ao Agora, o site que veio para substituir o NSA, e melhorar a agilidade do ensino da Etec!',
      context: { name },
    });
  }

  async sendVerificationEmail(
    to: string,
    token: string,
    appUrl = process.env.APP_URL,
  ) {
    const link = `${appUrl}/auth/verify-email?token=${token}`;
    await this.mailer.sendMail({
      to,
      subject: 'Confirme seu e-mail',
      template: 'verify-email',
      context: { link },
    });
  }

  async sendPasswordReset(
    to: string,
    token: string,
    appUrl = process.env.APP_URL,
  ) {
    const link = `${appUrl}/auth/reset-password?token=${token}`;
    await this.mailer.sendMail({
      to,
      subject: 'Redefinição de senha',
      template: 'reset-password',
      context: { link },
    });
  }

  async sendEmailChangeConfirm(
    to: string,
    token: string,
    appUrl = process.env.APP_URL,
  ) {
    const link = `${appUrl}/users/confirm-email-change?token=${token}`;
    await this.mailer.sendMail({
      to,
      subject: 'Confirme seu novo e-mail',
      template: 'confirm-email-change',
      context: { link },
    });
  }
}
