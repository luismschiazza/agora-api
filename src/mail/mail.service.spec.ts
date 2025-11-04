import { Test, TestingModule } from '@nestjs/testing';
import { AppMailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('AppMailService', () => {
  let moduleRef: TestingModule;
  let service: AppMailService;
  let mailer: jest.Mocked<MailerService>;
  const APP_URL = 'https://app.example.com';

  const originalEnv = process.env;

  beforeAll(() => {
    // isola mutações em process.env entre testes
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  beforeEach(async () => {
    process.env.APP_URL = APP_URL;

    const mailerMock: jest.Mocked<MailerService> = {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'm-123' } as any),
    } as any;

    moduleRef = await Test.createTestingModule({
      providers: [
        AppMailService,
        { provide: MailerService, useValue: mailerMock },
      ],
    }).compile();

    service = moduleRef.get<AppMailService>(AppMailService);
    mailer = moduleRef.get(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendWelcome', () => {
    it('envia template "welcome" com subject e context corretos', async () => {
      await service.sendWelcome('u@ex.com', 'Luis');

      expect(mailer.sendMail).toHaveBeenCalledWith({
        to: 'u@ex.com',
        subject: 'Bem-vindo!',
        template: 'welcome',
        context: { name: 'Luis' },
      });
    });
  });

  describe('sendVerificationEmail', () => {
    it('monta link com APP_URL padrão e token', async () => {
      await service.sendVerificationEmail('u@ex.com', 'tok123');

      const expectedLink = `${APP_URL}/auth/verify-email?token=tok123`;
      expect(mailer.sendMail).toHaveBeenCalledWith({
        to: 'u@ex.com',
        subject: 'Confirme seu e-mail',
        template: 'verify-email',
        context: { link: expectedLink },
      });
    });

    it('usa appUrl customizado quando fornecido', async () => {
      await service.sendVerificationEmail(
        'u@ex.com',
        't-xyz',
        'https://custom.app',
      );
      expect(mailer.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          context: { link: 'https://custom.app/auth/verify-email?token=t-xyz' },
        }),
      );
    });
  });

  describe('sendPasswordReset', () => {
    it('monta link de reset com token', async () => {
      await service.sendPasswordReset('u@ex.com', 'abc');
      const expectedLink = `${APP_URL}/auth/reset-password?token=abc`;
      expect(mailer.sendMail).toHaveBeenCalledWith({
        to: 'u@ex.com',
        subject: 'Redefinição de senha',
        template: 'reset-password',
        context: { link: expectedLink },
      });
    });
  });

  describe('sendEmailChangeConfirm', () => {
    it('monta link de confirmação de e-mail com token', async () => {
      await service.sendEmailChangeConfirm('u@ex.com', 'zzz');
      const expectedLink = `${APP_URL}/users/confirm-email-change?token=zzz`;
      expect(mailer.sendMail).toHaveBeenCalledWith({
        to: 'u@ex.com',
        subject: 'Confirme seu novo e-mail',
        template: 'confirm-email-change',
        context: { link: expectedLink },
      });
    });
  });

  describe('erros', () => {
    it('propaga erro do MailerService', async () => {
      mailer.sendMail.mockRejectedValueOnce(new Error('SMTP fail'));

      await expect(service.sendWelcome('u@ex.com', 'X')).rejects.toThrow(
        'SMTP fail',
      );
    });
  });
});
