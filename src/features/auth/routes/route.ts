import { Password } from 'src/features/auth/controllers/password';
import { Router } from 'express';
import { Signup } from 'src/features/auth/controllers/signup';
import { Signin } from 'src/features/auth/controllers/signin';
import { Signout } from 'src/features/auth/controllers/signout';

class AuthRoutes {

  private router;
  constructor() {
    this.router = Router();
  }

  public routers(): Router {
    this.router.post('/signup', Signup.prototype.create);
    this.router.post('/signin', Signin.prototype.check);
    this.router.get('/signout', Signout.prototype.update);
    this.router.post('/password', Password.prototype.sendEmailforResetPassword);
    // this.router.get('/signout/:token', Password.prototype.Password.prototype.passwordReset);

    return this.router;
  }
}

export const authRouters: AuthRoutes =new AuthRoutes();
