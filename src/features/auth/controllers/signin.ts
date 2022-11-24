
import { AuthService } from 'src/shared/globals/services/db/auth.service';
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { config } from 'src/config';
import { BadRequestError } from 'src/shared/globals/helpers/error-handlers';
import PasswordHelper from 'src/shared/globals/helpers/password-helper';
import { joiValidaation } from 'src/shared/globals/helpers/joi-validation.decorators';
import { signinSchema } from 'src/features/auth/schemes/signin';
// どこでハッシュかしているか
// mongooseの場合monngooseのプリをつかい挿入前にハッシュかしていた

export class Signin {

  @joiValidaation(signinSchema)
  public async check(req: Request, res: Response) {
    const { password, email } = req.body;

    const user = await AuthService.prototype.getUserByEmail(email);
    //Emailの登録がない場合エラーをかえす
    if (!user) throw new BadRequestError('無効な資格情報です。');

    //パスワードの比較
    const matchPassword = PasswordHelper.prototype.compare(password, user.password);
    if (!matchPassword) throw new BadRequestError('無効な資格情報です。');

    //フロントで頻繁に必要になるものを送る
    const userJwt: string = JWT.sign(
      {
          id: user.id,
          name: user.name,
          email: user.email,
          imageUrl: user.imageUrl,
          avatorColor: user.avatorColor
      },
      config.JWT_TOKEN!
    );

    req.session = {jwt: userJwt};

    res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', userToken:userJwt });//フロントで表示する必要のある情報も返す
  };
}
