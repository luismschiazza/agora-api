import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppMailService {
  constructor(private readonly mailer: MailerService) {}

  private baseUrl(fallback?: string) {
    return fallback ?? process.env.APP_URL ?? 'http://localhost:3000';
  }

  private buildLink(
    base: string,
    path: string,
    params: Record<string, string>,
  ) {
    const url = new URL(path, base.endsWith('/') ? base : base + '/');
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
    return url.toString();
  }

  private async send(
    to: string,
    subject: string,
    template: string,
    context: any,
  ) {
    return this.mailer.sendMail({ to, subject, template, context });
  }

  async sendWelcome(to: string, name?: string) {
    return this.send(to, 'Bem-vindo!', 'welcome', { name });
  }

  async sendVerificationEmail(
    to: string,
    token: string,
    appUrl = this.baseUrl(),
  ) {
    const link = this.buildLink(appUrl, 'auth/verify-email', {
      token: encodeURIComponent(token),
    });
    return this.send(to, 'Confirme seu e-mail', 'verify-email', { link });
  }

  async sendPasswordReset(to: string, token: string, appUrl = this.baseUrl()) {
    const link = this.buildLink(appUrl, 'auth/reset-password', {
      token: encodeURIComponent(token),
    });
    return this.send(to, 'Redefinição de senha', 'reset-password', { link });
  }

  async sendEmailChangeConfirm(
    to: string,
    token: string,
    appUrl = this.baseUrl(),
  ) {
    const link = this.buildLink(appUrl, 'users/confirm-email-change', {
      token: encodeURIComponent(token),
    });
    return this.send(to, 'Confirme seu novo e-mail', 'confirm-email-change', {
      link,
    });
  }
}
