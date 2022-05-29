import { CONFIG } from "@config/index";
import { HTTP, FAILURE_MESSAGE } from "@app/common/constant";
import Utility from "@utils/index";
import { NextFunction, Request, Response } from "express";
const BASIC_AUTH = Buffer.from(CONFIG.APP_CRED).toString("base64");
console.log("BASIC_AUTH", BASIC_AUTH);
/**
 * validate for Basic authorization.
 */
function checkBasic(req: Request, res: Response, next: NextFunction) {
  let [type, token, isChecked] = checkAuth(req);
  if (!isChecked) {
    return Utility.response(res, {}, FAILURE_MESSAGE.AUTHORIZATION.REQUIRED, false, HTTP.RES_CODE.UNAUTHORIZED);
  }
  console.log({ type, token });
  if (type === "Basic" && token === BASIC_AUTH) {
    return next();
  }
  return Utility.response(res, {}, FAILURE_MESSAGE.AUTHORIZATION.FAILED, false, HTTP.RES_CODE.UNAUTHORIZED);
}
/**
 * validate for Bearer authorization.
 */
function checkBearer(req: Request, res: Response, next: NextFunction) {
  let [type, token, isChecked] = checkAuth(req);
  if (!isChecked) {
    return Utility.response(res, {}, FAILURE_MESSAGE.AUTHORIZATION.INVALID, false, HTTP.RES_CODE.UNAUTHORIZED);
  }
  if (type === "Bearer" && token.toString().length) {
    return next();
  }
  return Utility.response(res, {}, FAILURE_MESSAGE.AUTHORIZATION.FAILED, false, HTTP.RES_CODE.UNAUTHORIZED);
}
/**
 * validate authorization and methods.
 */
function checkAuth(req: Request) {
  const { authorization } = req.headers;
  if (!authorization) {
    return [null, "", false];
  }
  const [type, token] = authorization.split(" ");
  if (!type || !token || !["Basic", "Bearer"].includes(type)) {
    return [type, token, false];
  }
  return [type, token, true];
}

export default { checkBasic, checkBearer };
