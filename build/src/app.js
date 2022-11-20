"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const setupServer_1 = require("./setupServer");
const express_1 = __importDefault(require("express"));
const setupDatabase_1 = require("./setupDatabase");
class Application {
    initialize() {
        this.loadConfig();
        setupDatabase_1.prisma.user.findMany().then((res) => {
            console.log(res);
        });
        const app = (0, express_1.default)();
        const server = new setupServer_1.OpenworingServer(app);
        server.start();
    }
    loadConfig() {
        config_1.config.validateConfig();
    }
}
const application = new Application();
application.initialize();
//# sourceMappingURL=app.js.map