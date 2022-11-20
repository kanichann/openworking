import { config } from './config';
import { OpenworingServer } from 'src/setupServer';
import express, { Express } from 'express';
import { prismaConnection } from 'src/setupDatabase';

class Application {
  public initialize(): void {
    this.loadConfig();
    const app: Express = express();
    const server: OpenworingServer = new OpenworingServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }
}

const application: Application = new Application();
application.initialize();
