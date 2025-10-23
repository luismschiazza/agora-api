import { Controller, Get, Query } from '@nestjs/common';
import { AppMailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mail: AppMailService) {}

  @Get('test')
  async sendTestMail(@Query('to') to: string) {
    await this.mail.sendWelcome(to || 'teste@exemplo.com', 'Luís');
    return { message: `E-mail enviado para ${to || 'teste@exemplo.com'}` };
  }
}
