"use strict";
import { CONFIG } from "@config/index";
import { IError, IResponseData } from "@src/app/common/interfaces";
import { Request, Response } from "express";
import moment from "moment";
import { SUCCESS_MESSAGE, HTTP, LOG_LEVEL_TYPE, LOG_LEVEL_COLOR, FAILURE_MESSAGE } from "@app/common/constant";
export default class Utility {
  /* 
    custom logger
  */
  static goLogger(methodName: string, developerName: string, message: string, payload: any = {}, type: string = LOG_LEVEL_TYPE.INFO) {
    if (CONFIG.IS_CONSOLE_LOG === "true" || CONFIG.IS_CONSOLE_LOG) {
      let logged = JSON.stringify({
        methodName: methodName || "N/A",
        developerName: developerName || "N/A",
        message: message || "N/A",
        payload: payload || {},
        type: type,
        timestamp: new Date().toLocaleString(),
      });
      console.log(LOG_LEVEL_COLOR[type], logged);
    }
  }
  /*
    parse response according data or err.
  */
  static async parseResponse(promise: Promise<any>) {
    return promise
      .then((data) => {
        return [null, data.data];
      })
      .catch((err) => {
        return [err];
      });
  }
  /**
   *
   * @param err object
   * @param req
   * @param res
   * @returns
   */
  static handleError(err: IError, req: Request, res: Response) {
    if (!res) return false;
    err = err;
    const msg = err.message ? err.message : FAILURE_MESSAGE.INTERNAL_SERVER_ERROR;
    const code = err.code ? err.code : HTTP.RES_CODE.SERVER_ERROR;
    this.response(res, err, msg, HTTP.STATUS.FAILURE, code);
  }

  /**
   *
   * @param {Object} data
   * @param {Request} req
   * @param {Response} res
   */
  static handleResponse(data: IResponseData, req: Request, res: Response) {
    if (!res) return false;
    data = data || {};
    const msg = data.message ? data.message : SUCCESS_MESSAGE.SUCCESS;
    const code = data.code ? data.code : HTTP.RES_CODE.OK;
    data.message ? delete data.message : null;
    data.code ? delete data.code : null;
    this.response(res, data.data, msg, HTTP.STATUS.SUCCESS, code);
  }

  /**
   *
   * @param {Response} res
   * @param {Object} data
   * @param {String|Array} message
   * @param {Boolean} isSuccess
   * @param {Number} code
   */
  static response(res: Response, data: any, message: string, isSuccess: boolean, code: number): void {
    let responseObj = {
      responseData: data,
      message: message,
      success: isSuccess,
      responseCode: code,
    };
    try {
      res.format({
        json: () => {
          res.status(+code).send(responseObj);
        },
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  /**
   *
   * @param {Object} data
   * @param {string} message
   * @param {number} code
   */
  static successResponse(data: any, message: string, code: number) {
    data = { ...data, message, code };
    return { data };
  }

  static getMillis() {
    return +moment().format("x");
  }
}
