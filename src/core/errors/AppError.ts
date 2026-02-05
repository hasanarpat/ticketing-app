/**
 * AppError – consistent error model for the API.
 * statusCode, message, code. No stack in production response.
 */

export type AppErrorOptions = {
  statusCode: number;
  message: string;
  code: string;
};

export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(options: AppErrorOptions) {
    super(options.message);
    this.name = "AppError";
    this.statusCode = options.statusCode;
    this.code = options.code;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
