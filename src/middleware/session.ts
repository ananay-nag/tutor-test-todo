import { SessionModel } from "@app/models/session";
import CustomError from "@utils/error";
import { HTTP, CUSTOM_ERROR_NAME, FAILURE_MESSAGE } from "@app/common/constant";
import Utility from "@src/utils";
import { NextFunction, Response } from "express";
import { IApp } from "@src/app/common/interfaces";
class SessionManager {
  /**
   * create new session and store in db
   * @param user string
   * @returns
   */
  async createSession(user: string) {
    if (!user) {
      throw new CustomError(HTTP.RES_CODE.BAD_REQUEST, FAILURE_MESSAGE.PARAMS.INCOMPLETE + " in createSession", CUSTOM_ERROR_NAME.INCOMPLETE_PARAM);
    } else {
      try {
        await SessionModel.updateMany({ addedBy: user, isActive: true }, { isActive: false, modifiedOn: Utility.getMillis() }).catch((err: any) => {
          throw err;
        });
        let session: any = {
          addedOn: Utility.getMillis(),
          modifiedOn: Utility.getMillis(),
          addedBy: user,
          isActive: true,
        };
        return await SessionModel.create(session).catch((err: any) => {
          throw err;
        });
      } catch (err: any) {
        throw new CustomError(err.code || 400, err.message + " in createSession", err.name || CUSTOM_ERROR_NAME.EXECUSTION_FAILED);
      }
    }
  }

  /**
   * check session is valid or not
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns
   */
  async isValidSession(req: IApp.Request, res: Response, next: NextFunction) {
    if (!req || !req?.client) {
      return Utility.response(res, {}, FAILURE_MESSAGE.PARAMS.INCOMPLETE + " in isValidSession", false, HTTP.RES_CODE.FORBIDDEN);
    } else {
      let data = req.client;
      try {
        let user: any = await SessionModel.findOne({ _id: data?.session, addedBy: data.user }).lean();
        if (user && user._id) next();
        else
          return Utility.response(
            res,
            { name: CUSTOM_ERROR_NAME.SESSION_ERROR, message: FAILURE_MESSAGE.SESSION.FAILED, code: 401 },
            FAILURE_MESSAGE.SESSION.FAILED,
            false,
            HTTP.RES_CODE.UNAUTHORIZED
          );
      } catch (err: any) {
        return Utility.response(res, {}, err.message || FAILURE_MESSAGE.SESSION.FAILED, false, err.code || HTTP.RES_CODE.UNAUTHORIZED);
      }
    }
  }
}

export const sessionManager = new SessionManager();
