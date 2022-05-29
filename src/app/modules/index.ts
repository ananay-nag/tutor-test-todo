import { authentication, authorization } from "@src/middleware/index";
import { NextFunction, Request, Response, Router } from "express";
import { toDoController } from "@app/modules/todo/index";
import { sessionManager } from "@src/middleware/session";
// create Router
const todoRouter: Router = Router();
todoRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("todoRouter  working fine");
});
// api routes
// check Basis api auth => generateToken
todoRouter.post("/generate-token", [authorization.checkBasic], toDoController.generateToken);
// check Bearer auth => verify auth token => check valid session => createTask
todoRouter.post("/task", [authorization.checkBearer, authentication.verifyToken, sessionManager.isValidSession], toDoController.createTask);
// check Bearer auth => verify auth token => check valid session => getTask
todoRouter.post("/list", [authorization.checkBearer, authentication.verifyToken, sessionManager.isValidSession], toDoController.getTask);
// check Bearer auth => verify auth token => check valid session => updateTask
todoRouter.patch("/task", [authorization.checkBearer, authentication.verifyToken, sessionManager.isValidSession], toDoController.updateTask);
// check Bearer auth => verify auth token => check valid session => updateStatus
todoRouter.patch("/status", [authorization.checkBearer, authentication.verifyToken, sessionManager.isValidSession], toDoController.updateStatus);

export default { router: todoRouter, path: "/todo" };
