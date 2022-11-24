import { redisConnection } from 'src/shared/globals/services/redis/redis.connection';
import { config } from './config';
import { OpenworingServer } from 'src/setupServer';
import express, { Express } from 'express';

class Application {
  public initialize(): void {
    this.loadConfig();
    // redisConnection.connect();
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
