import { ObjectId } from "mongoose";

export interface IGenerateToken {
  email: string;
}

export interface ITask {
  name: string;
  description?: string;
  list?: Array<string>;
  taskId?: ObjectId;
}

export interface ITaskList {
  taskIds: Array<string>;
}

export interface IUpdateTaskStatus {
  taskId: ObjectId;
  status: number;
}
