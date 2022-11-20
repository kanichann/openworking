import { Signup } from './features/auth/controllers/signup';
import { Application } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use(`${BASE_PATH}/signup`, Signup.prototype.create);
  };
  routes();
};
