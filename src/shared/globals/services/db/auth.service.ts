
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
      exist = await prismaConnection.user.findUniqueOrThrow({
        where: {
          email:email
        }
      });
    } catch (err){
      exist = false;
    }
    console.log(exist);
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

  public async updateTokenInUser(email: string, token: string, tokenExpired: number) {
    console.log(tokenExpired);
    console.log(typeof tokenExpired);
    try {
      const DBuserdata = await prismaConnection.user.update({
        where: {
        email
        },
        data: {
          token,
          tokenExpired
        }
      });
      return DBuserdata;

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        throw new BadRequestError('エラーが発生しました。');
      }
    };
  }

  public async getTokenInUserByToken(token: string){
      try {
         const TokenData = await prismaConnection.user.findFirstOrThrow({
          where: {
             token
           },
           select: {
            token: true,
            tokenExpired: true,
            id:true
          }
         });
        return TokenData;

      } catch (err) {
        console.log(err);
        throw new BadRequestError('エラーが発生しました。');
      }
  }
  // public async getTokenInUserByToken(token: string):Promise<{ token: string | null, tokenExpired: number | null ,id:number}> {
  //     try {
  //        const TokenData = await prismaConnection.user.findFirstOrThrow({
  //         where: {
  //            token
  //          },
  //          select: {
  //           token: true,
  //           tokenExpired: true,
  //           id:true
  //         }
  //        });
  //       return TokenData;

  //     } catch (err) {
  //       console.log(err);
  //       throw new BadRequestError('エラーが発生しました。');
  //     }
  // }

  public async updatePasswordInUserById(id: number, password:string) {
    try {
      const result = await prismaConnection.user.update({
        where: { id },
        data: {
          password,
          token: null,
          tokenExpired: null
        }
      });

      return result;

    }
    catch (err) {
      console.log(err);
      throw new BadRequestError('エラーが発生しました。');
    }
  }
}
