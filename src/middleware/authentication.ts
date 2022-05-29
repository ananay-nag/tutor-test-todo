import { verify, sign } from "jsonwebtoken";
import { CONFIG } from "@config/index";
import { HTTP, FAILURE_MESSAGE } from "@app/common/constant";
import Utility from "@utils/index";
import { NextFunction, Request, Response } from "express";
import { IApp } from "@src/app/common/interfaces";

/**
 * Verify supplied token
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  if (!token) {
    return Utility.response(res, {}, FAILURE_MESSAGE.TOKEN.NOT_PROVIDED, false, HTTP.RES_CODE.FORBIDDEN);
  } else {
    console.log({ token, "CONFIG.SECRET": CONFIG.SECRET });
    verify(token, CONFIG.SECRET, (err: any, decoded: any) => {
      if (err) {
        console.log({ err });
        if (err.name === "TokenExpiredError") {
          return Utility.response(res, { name: err.name, message: err.message, code: 401 }, FAILURE_MESSAGE.TOKEN.INVALID, false, HTTP.RES_CODE.UNAUTHORIZED);
        }
        return Utility.response(res, err, FAILURE_MESSAGE.TOKEN.INVALID, false, HTTP.RES_CODE.UNAUTHORIZED);
      } else if (decoded.key && decoded.session) {
        let client: IApp.Client = {
          user: decoded.key,
          session: decoded.session,
        };
        req["client"] = client;
        next();
      } else {
        return Utility.response(res, {}, FAILURE_MESSAGE.TOKEN.INVALID, false, HTTP.RES_CODE.UNAUTHORIZED);
      }
    });
  }
}

/**
 *
 * @param key user id
 * @param id session id
 * @param expire expire in seconds
 * @returns json web token decoded string.
 */
function createToken(key: any, session: any, expire: number) {
  return sign({ key, session }, CONFIG.SECRET, {
    expiresIn: expire,
  });
}
export default { verifyToken, createToken };
