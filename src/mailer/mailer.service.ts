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
      secure: process.env.SECURE,
      service: process.env.SERVICE,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendMail(email: string, content, link: string): Promise<void> {
    try {
      const transporter = this.getTransport();
      const url = new URL(`${this.baseUrl}/attempts/update`);
      const params = new URLSearchParams({
        id: link,
      });
      url.search = params.toString();
      const mailOptions = {
        from: process.env.FROM,
        to: email,
        subject: 'You have won a lottery',
        html: generateVerificationEmailHtml(content, url.toString()),
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw Error('failed to send email');
    }
  }
}
