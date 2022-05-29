import { Router, NextFunction, Request, Response } from "express";
import todoRouter from "@app/modules/index";
// create Router
const appRouter: Router = Router();

appRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("appRouter working fine");
});
// api routes
appRouter.use(todoRouter.path, todoRouter.router);

export default appRouter;
