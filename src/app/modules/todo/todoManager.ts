import { CUSTOM_ERROR_NAME, FAILURE_MESSAGE, HTTP, SESSION, SUCCESS_MESSAGE, TODO_STATUS } from "@app/common/constant";
import { authentication } from "@src/middleware/index";
import { IGenerateToken, ITask, ITaskList, IUpdateTaskStatus } from "./todo.interface";
import CustomError from "@src/utils/error";
import { sessionManager } from "@src/middleware/session";
import { TodoModel } from "@src/app/models/todo";
import Utility from "@src/utils";
import { IApp } from "@src/app/common/interfaces";
const mongoose = require("mongoose");

class ToDoManager {
  get Model() {
    return TodoModel;
  }
  async generateToken(data: IGenerateToken) {
    if (!data.email) {
      throw new CustomError(HTTP.RES_CODE.BAD_REQUEST, FAILURE_MESSAGE.PARAMS.INCOMPLETE + " in generateToken", CUSTOM_ERROR_NAME.INCOMPLETE_PARAM);
    }
    try {
      let session = await sessionManager.createSession(data.email).catch((err: any) => {
        throw err;
      });
      let token = authentication.createToken(data.email, session._id, SESSION.EXPIRE.DAY);
      return Utility.successResponse({ token, ...data }, SUCCESS_MESSAGE.TOKEN_GENERATED, HTTP.RES_CODE.OK);
    } catch (err: any) {
      throw new CustomError(err.code || 400, err.message || "error in generateToken", err.name || CUSTOM_ERROR_NAME.EXECUSTION_FAILED);
    }
  }

  async createTask(client: IApp.Client, data: ITask) {
    if (!data.name) {
      throw new CustomError(HTTP.RES_CODE.BAD_REQUEST, FAILURE_MESSAGE.PARAMS.INCOMPLETE + " in createTask", CUSTOM_ERROR_NAME.INCOMPLETE_PARAM);
    }
    try {
      let task = await this.Model.create({ ...data, addedBy: client.user, status: TODO_STATUS.OPEN }).catch((err: any) => {
        throw err;
      });
      return Utility.successResponse({ task }, SUCCESS_MESSAGE.TASK_CREATED, HTTP.RES_CODE.OK);
    } catch (err: any) {
      throw new CustomError(err.code || 400, err.message || "error in createTask", err.name || CUSTOM_ERROR_NAME.EXECUSTION_FAILED);
    }
  }
  async getTask(client: IApp.Client, data: ITaskList) {
    if (!data.taskIds) {
      throw new CustomError(HTTP.RES_CODE.BAD_REQUEST, FAILURE_MESSAGE.PARAMS.INCOMPLETE + " in getTask", CUSTOM_ERROR_NAME.INCOMPLETE_PARAM);
    }
    try {
      let query: Record<string, any> = {};
      query.addedBy = client.user;
      query.status = { $nin: [TODO_STATUS.DELETED] }; //Do not update deleted tasks
      if (data?.taskIds && data.taskIds.length) {
        query._id = { $in: data.taskIds };
      }
      let task = await this.Model.find(query).catch((err: any) => {
        throw err;
      });
      return Utility.successResponse({ task }, SUCCESS_MESSAGE.TASK_LIST, HTTP.RES_CODE.OK);
    } catch (err: any) {
      throw new CustomError(err.code || 400, err.message || "error in getTask", err.name || CUSTOM_ERROR_NAME.EXECUSTION_FAILED);
    }
  }

  async updateTask(client: IApp.Client, data: ITask) {
    if (!data.name || !data.taskId) {
      throw new CustomError(HTTP.RES_CODE.BAD_REQUEST, FAILURE_MESSAGE.PARAMS.INCOMPLETE + " in updateTask", CUSTOM_ERROR_NAME.INCOMPLETE_PARAM);
    }
    try {
      let task = await this.Model.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(data?.taskId), status: { $ne: TODO_STATUS.DELETED }, addedBy: client?.user },
        { $set: { ...data } },
        { new: true }
      ).catch((err: any) => {
        throw err;
      });
      if (!task) {
        throw new CustomError(400, "Task deleted or not exist", CUSTOM_ERROR_NAME.DATA_NOT_FOUND);
      }
      return Utility.successResponse({ task }, SUCCESS_MESSAGE.TASK_UPDATE, HTTP.RES_CODE.OK);
    } catch (err: any) {
      throw new CustomError(err.code || 400, err.message || "error in updateTask", err.name || CUSTOM_ERROR_NAME.EXECUSTION_FAILED);
    }
  }

  async updateStatus(client: IApp.Client, data: IUpdateTaskStatus) {
    if (!data.status || !data.taskId) {
      throw new CustomError(HTTP.RES_CODE.BAD_REQUEST, FAILURE_MESSAGE.PARAMS.INCOMPLETE + " in updateStatus", CUSTOM_ERROR_NAME.INCOMPLETE_PARAM);
    }
    try {
      let task = await this.Model.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(data?.taskId), status: { $ne: TODO_STATUS.DELETED }, addedBy: client?.user },
        { $set: { status: data?.status } },
        { new: true }
      ).catch((err: any) => {
        throw err;
      });
      if (!task) {
        throw new CustomError(400, "Task deleted or not exist", CUSTOM_ERROR_NAME.DATA_NOT_FOUND);
      }
      return Utility.successResponse({ task }, SUCCESS_MESSAGE.TASK_UPDATE, HTTP.RES_CODE.OK);
    } catch (err: any) {
      throw new CustomError(err.code || 400, err.message || "error in updateStatus", err.name || CUSTOM_ERROR_NAME.EXECUSTION_FAILED);
    }
  }
}

export const toDoManager = new ToDoManager();
