import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
import { URL, URLSearchParams } from 'url';
import { generateVerificationEmailHtml } from './templates';

@Injectable()
export default class MailerService {
  baseUrl = process.env.DOMAIN;

  getTransport() {
    return nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.SECURE_MAIL,
      service: process.env.MAILER_SERVICE,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendMail(email: string, link: string): Promise<void> {
    try {
      const transporter = this.getTransport();
      const url = new URL(`${this.baseUrl}/attempt/update`);
      const params = new URLSearchParams({
        link,
      });
      url.search = params.toString();
      const mailOptions = {
        from: process.env.FROM,
        to: email,
        subject: 'You have won a lottery',
        html: generateVerificationEmailHtml(url.toString()),
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw Error('Failed to send verification email');
    }
  }
}
