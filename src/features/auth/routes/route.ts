import { Router } from 'express';
import { Signup } from 'src/features/auth/controllers/signup';

class AuthRoutes {

  private router;
  constructor() {
    this.router = Router();
  }

  public routers(): Router {
    this.router.post('/signup', Signup.prototype.create);

    return this.router;
  }
}

export const authRouters: AuthRoutes =new AuthRoutes();
