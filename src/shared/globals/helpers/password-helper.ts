import bcrypt from 'bcryptjs';


class PasswordHelper {

  public hash(hashWord:string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(hashWord, salt);
  }

  public compare(compareWord: string, hashedWord:string) {
    return bcrypt.compareSync(compareWord, hashedWord);
  }
}

export default PasswordHelper;
