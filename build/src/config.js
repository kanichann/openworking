"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bunyan_1 = __importDefault(require("bunyan"));
dotenv_1.default.config({});
class Config {
    constructor() {
        this.JWT_TOKEN = process.env.JWT_TOKEN || this.JWT_TOKEN;
        this.NODE_ENV = process.env.NODE_ENV || this.NODE_ENV;
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || this.SECRET_KEY_ONE;
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || this.SECRET_KEY_TWO;
        this.CLIENT_URL = process.env.CLIENT_URL || this.CLIENT_URL;
        this.REDIS_HOST = process.env.REDIS_HOST || this.REDIS_HOST;
        // this.JWT_TOKEN = process.env.JWT_TOKEN || this.JWT_TOKEN;
    }
    createLogger(name) {
        return bunyan_1.default.createLogger({ name, level: 'debug' });
    }
    validateConfig() {
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) {
                throw new Error(`Configuration ${key} is undefind`);
            }
        }
    }
}
exports.config = new Config();
//# sourceMappingURL=config.js.map