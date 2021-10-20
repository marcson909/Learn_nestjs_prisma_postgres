import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailHelper(
    user,
    subject?,
    email?: string,
    password?: string,
    website?: string,
  ) {
    await this.mailerService.sendMail({
      to: user,
      subject: subject ? subject : 'Welcome to app',
      template: './templateSendEmail.ejs',
      context: {
        email,
        password,
        website,
      },
    });
  }
}
