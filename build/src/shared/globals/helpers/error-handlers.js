"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTooLargeError = exports.NotAuthorizedError = exports.NotFoundError = exports.BadRezuestError = exports.CustomError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class CustomError extends Error {
    constructor(message) {
        super(message);
    }
    serializeErrors() {
        return {
            message: this.message,
            status: this.status,
            statusCode: this.statusCode
        };
    }
}
exports.CustomError = CustomError;
class BadRezuestError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
        this.status = 'error';
    }
}
exports.BadRezuestError = BadRezuestError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.NOT_FOUND;
        this.status = 'error';
    }
}
exports.NotFoundError = NotFoundError;
class NotAuthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.UNAUTHORIZED;
        this.status = 'error';
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
class FileTooLargeError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.REQUEST_TOO_LONG;
        this.status = 'error';
    }
}
exports.FileTooLargeError = FileTooLargeError;
//# sourceMappingURL=error-handlers.js.map