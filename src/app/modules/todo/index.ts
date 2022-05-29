import Utility from "@utils/index";
import { toDoManager } from "./todoManager";
import { HTTP, LOG_LEVEL_TYPE, SUCCESS_MESSAGE } from "@app/common/constant";
import { IApp } from "@src/app/common/interfaces";

class ToDoController {
  async generateToken(request: IApp.Request, response: IApp.Response) {
    Utility.goLogger("generateToken", "ANANYA NAG", "generateToken start", request.body, LOG_LEVEL_TYPE.INFO);
    let [error, token] = await Utility.parseResponse(toDoManager.generateToken(request.body));
    if (!token) return Utility.handleError(error, request, response);
    return Utility.response(response, token, SUCCESS_MESSAGE.SUCCESS, HTTP.STATUS.SUCCESS, HTTP.RES_CODE.OK);
  }
  async getTask(request: IApp.Request, response: IApp.Response) {
    Utility.goLogger("getTask", "ANANYA NAG", "getTask start", request.body, LOG_LEVEL_TYPE.INFO);
    let [error, task] = await Utility.parseResponse(toDoManager.getTask(request.client, request.body));
    if (!task) return Utility.handleError(error, request, response);
    return Utility.response(response, task, SUCCESS_MESSAGE.SUCCESS, HTTP.STATUS.SUCCESS, HTTP.RES_CODE.OK);
  }
  async createTask(request: IApp.Request, response: IApp.Response) {
    Utility.goLogger("createTask", "ANANYA NAG", "createTask start", request.body, LOG_LEVEL_TYPE.INFO);
    let [error, task] = await Utility.parseResponse(toDoManager.createTask(request.client, request.body));
    if (!task) return Utility.handleError(error, request, response);
    return Utility.response(response, task, SUCCESS_MESSAGE.SUCCESS, HTTP.STATUS.SUCCESS, HTTP.RES_CODE.OK);
  }
  async updateTask(request: IApp.Request, response: IApp.Response) {
    Utility.goLogger("updateTask", "ANANYA NAG", "updateTask start", request.body, LOG_LEVEL_TYPE.INFO);
    let [error, task] = await Utility.parseResponse(toDoManager.updateTask(request.client, request.body));
    if (!task) return Utility.handleError(error, request, response);
    return Utility.response(response, task, SUCCESS_MESSAGE.SUCCESS, HTTP.STATUS.SUCCESS, HTTP.RES_CODE.OK);
  }
  async updateStatus(request: IApp.Request, response: IApp.Response) {
    Utility.goLogger("updateStatus", "ANANYA NAG", "updateStatus start", request.body, LOG_LEVEL_TYPE.INFO);
    let [error, task] = await Utility.parseResponse(toDoManager.updateStatus(request.client, request.body));
    if (!task) return Utility.handleError(error, request, response);
    return Utility.response(response, task, SUCCESS_MESSAGE.SUCCESS, HTTP.STATUS.SUCCESS, HTTP.RES_CODE.OK);
  }
}
export const toDoController = new ToDoController();
