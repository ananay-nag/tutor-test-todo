"use strict";

class CustomError extends Error {
  name: string;
  code: number;
  message: string;
  constructor(code: number, message: string, name: string) {
    super();
    Error.captureStackTrace(this, CustomError);
    this.name = name || CustomError.name;
    this.code = code;
    this.message = message;
  }
}

export default CustomError;
