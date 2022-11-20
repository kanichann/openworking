import bcrypt from 'bcryptjs';


class PasswordHelper {

  public hash(hashWord:string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(hashWord, salt);
  }
}

export default PasswordHelper;
