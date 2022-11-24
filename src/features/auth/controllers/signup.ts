
import { AuthService } from 'src/shared/globals/services/db/auth.service';
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { user } from '@prisma/client';
import { config } from 'src/config';
import { uid } from 'uid';
import { BadRequestError } from 'src/shared/globals/helpers/error-handlers';
import PasswordHelper from 'src/shared/globals/helpers/password-helper';
import { joiValidaation } from 'src/shared/globals/helpers/joi-validation.decorators';
import { signupSchema } from 'src/features/auth/schemes/siignup';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from 'src/shared/globals/helpers/cloudinary-upload';
// どこでハッシュかしているか
// mongooseの場合monngooseのプリをつかい挿入前にハッシュかしていた

export class Signup {

  @joiValidaation(signupSchema)
  public async create(req: Request,res:Response) {
    const { password, name, email, avatorColor, avatorImage } = req.body;
    // 同じひとがいないか
    const exist = await AuthService.prototype.checkUserExistByEmail(email);
    if (exist) throw new BadRequestError('メールアドレスは既に利用されています。');

    //画像をCloudinaryに保存する
    const imageID: string = uid(40);
    const result: UploadApiResponse = (await uploads(avatorImage, `${imageID}`, false, true)) as UploadApiResponse;
    const imageUrl = `https://res.cloudinary.com/dzre5zq6d/image/upload/v${result.version}/${imageID}`;
    if (!result?.public_id) {
      throw new BadRequestError('画像の保存に失敗しました。再度、ご登録をお願いします。');
    }

    const hashedPassword = PasswordHelper.prototype.hash(password);
    const insertUserData = await AuthService.prototype.insertUser({ imageId: imageID, imageUrl: imageUrl, password: hashedPassword, name, email, avatorColor });
    const userJwt = JWT.sign(
      {
        id: insertUserData!.id,
        imageUrl: insertUserData!.imageUrl,
        email: insertUserData!.email,
        username: insertUserData!.avatorColor,
        avatarColor: insertUserData!.avatorColor
      },
      config.JWT_TOKEN!
    );

    res.status(HTTP_STATUS.CREATED).json({ message: 'ログインに成功しました。', userToken:userJwt });//フロントで表示する必要のある情報も返す
  };

}
