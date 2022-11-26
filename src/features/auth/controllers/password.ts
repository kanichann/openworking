import HTTP_STATUS from 'http-status-codes';
import { Request,Response } from 'express';
import { AuthService } from 'src/shared/globals/services/db/auth.service';
import crypto from 'crypto';
import { BadRequestError } from 'src/shared/globals/helpers/error-handlers';
import { config } from 'src/config';
import { Email } from 'src/shared/globals/services/email/Email';
import fs from 'fs';
import ejs from 'ejs';
import PasswordHelper from 'src/shared/globals/helpers/password-helper';


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

    AuthService.prototype.updateTokenInUser(email, randomCharacters,  Date.now() + 60 * 60 );

    const resetLink = `${config.CLIENT_URL}/reset-password?token=${randomCharacters}`;
    const template: string = Password.prototype.resetEmailTemplate(exist.name, resetLink);
    await Email.prototype.submit(exist.email, template, 'パスワードのリセットについて。');
    res.status(HTTP_STATUS.OK).json({ message: 'Eメールを送信しました。' });

  }

  public async resetPassword(req:Request,res:Response) {
    const { password, confirmPassword } = req.body;
    if (password === confirmPassword) throw new BadRequestError('パスワードが一致していません。');
    const { token } = req.params;

    const passwordResetData = await AuthService.prototype.getTokenInUserByToken(token);

    //token登録がなかった場合
    if (!passwordResetData.token || !passwordResetData.tokenExpired) throw new BadRequestError('無効な資格情報です。');
    if (passwordResetData.tokenExpired > Date.now()) throw new BadRequestError('有効期限が切れています。');

    // passworのこうしん
    const hashedPassword = PasswordHelper.prototype.hash(password);
    await AuthService.prototype.updatePasswordInUserById(passwordResetData.id, hashedPassword);
    res.status(HTTP_STATUS.OK).json({ message: 'パスワードを更新しました。' });
  }

  private resetEmailTemplate(username: string, resetUrl: string) {
    return ejs.render(fs.readFileSync(__dirname + '/../ejs/resetEmail.ejs', 'utf8'), {
      username,
      resetUrl,
      image_url: 'https://w7.pngwing.com/pngs/120/102/png-transparent-padlock-logo-computer-icons-padlock-technic-logo-password-lock.png'
    });


  }
}
