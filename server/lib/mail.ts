import nodemailer from 'nodemailer';
import { emailConfig } from '../config';
import logger from './logger';

const transporter = nodemailer.createTransport({
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@stockbay.app',
    pass: emailConfig.noreplyPassword,
  },
});

export function sendMail(account: string, subject: string, text: string) {
  const mailOptions = {
    from: '"noreply" <noreply@stockbay.app>',
    to: account,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err) => {
    logger.error(err?.message);
  });
}
