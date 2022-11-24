
import {  Prisma, PrismaClient,user } from '@prisma/client';
import { prismaConnection } from 'src/setupDatabase';
import { BadRequestError } from 'src/shared/globals/helpers/error-handlers';

export class AuthService {

  public async insertUser(userData: Prisma.userCreateInput) {
    try {
      const DBuserdata = await prismaConnection.user.create({
        data: userData
      });
      return DBuserdata;

    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestError('登録に失敗しました。再度ご登録をお願いいたします。');
     }
    };
  }


  public async checkUserExistByEmail(email: string): Promise<boolean> {
    let exist;
    try {
      exist =await prismaConnection.user.findUniqueOrThrow({
        where: {
          email:email
        }
      });
    } catch (err){
      exist = false;
    }
    return Boolean(exist);
  }

  public async getUserByEmail(email: string): (Promise<user | false>) {
    let exist:user | false;
    try {
      exist =await prismaConnection.user.findUniqueOrThrow({
        where: {
          email:email
        }
      });
    } catch (err){
      exist = false;
    }
    return exist;
  }
}
