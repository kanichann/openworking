import { config } from './config';
import { OpenworingServer } from './setupServer';
import express, { Express } from 'express';
import { prisma } from './setupDatabase';

class Application {
  public initialize(): void {
    this.loadConfig();
    prisma.user.findMany().then((res) => {
      console.log(res);
    });
    const app: Express = express();
    const server: OpenworingServer = new OpenworingServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
