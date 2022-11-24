import nodemailer from 'nodemailer';
import { config } from 'src/config';
import Mail from 'nodemailer/lib/mailer';
import Logger from 'bunyan';
import { BadRequestError } from 'src/shared/globals/helpers/error-handlers';
const log: Logger = config.createLogger('email');

export class Email {

  public async submit(email: string, template: string, subject: string) {
    if (config.NODE_ENV === 'test' || config.NODE_ENV === 'development') {
      await this.developmentEmailSubmit(email,template,subject);
    } else {
      this.productEmailSubmit();
    }
  }

  private async developmentEmailSubmit(email: string, template: string, subject: string) {
    const transporter:Mail = nodemailer.createTransport({
      host: 'localhost',
      port: 25,
      secure: false, // true for 465, false for other ports

    });
    const mailOptions = {
      from: `OpenWorker <${config.SENDER_EMAIL!}>`,
      to: email,
      subject ,
      html: template
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      log.error('Error sending email', error);
      throw new BadRequestError('Error sending email');
    }
  };
  private productEmailSubmit() {
    return;
  };
}
