import HTTP_STATUS from 'http-status-codes';
import { Request,Response } from 'express';
import { AuthService } from 'src/shared/globals/services/db/auth.service';
import crypto from 'crypto';
import { BadRequestError } from 'src/shared/globals/helpers/error-handlers';
import { config } from 'src/config';
import { Email } from 'src/shared/globals/services/email/Email';
import fs from 'fs';
import ejs from 'ejs';

export class Password{

  public async sendEmailforResetPassword(req:Request,res:Response) {
    const { email } = req.body;
    // アドレスが登録されているか
    const exist = await AuthService.prototype.getUserByEmail(email);
    if (!exist) throw new BadRequestError('メールアドレスは登録されていません。');

    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    console.log('randomBytes:',randomBytes);
    const randomCharacters: string = randomBytes.toString('hex');
    console.log('randomCharacters:', randomCharacters);
    const resetLink = `${config.CLIENT_URL}/reset-password?token=${randomCharacters}`;
    const template: string = Password.prototype.resetEmailTemplate(exist.name, resetLink);
    await Email.prototype.submit(exist.email, template, 'パスワードのリセットについて。');
    res.status(HTTP_STATUS.OK).json({ message: 'Eメールを送信しました。' });

  }

  private resetEmailTemplate(username: string, resetUrl: string) {
    return ejs.render(fs.readFileSync(__dirname + '/../ejs/resetEmail.ejs', 'utf8'), {
      username,
      resetUrl,
      image_url: 'https://w7.pngwing.com/pngs/120/102/png-transparent-padlock-logo-computer-icons-padlock-technic-logo-password-lock.png'
    });
  }
}
