import express from "express";

export interface IError extends ErrorConstructor {
  message?: string;
  code?: number;
  name?: string;
}

export interface IResponseData {
  message?: string;
  code?: number;
  data?: any;
}

export namespace IApp {
  export interface Client {
    user: string;
    session: string;
  }
  export interface Request<T = any> extends express.Request {
    data?: T;
    client?: Client;
    cacheKey?: string;
  }
  export interface Response extends express.Response {}
}
