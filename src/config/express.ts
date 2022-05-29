import MORGAN from "morgan";
import { urlencoded, json } from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { Request, Response, NextFunction } from "express";

//CORS middleware
let allowCrossDomain = function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  next();
};

export function expressConfig (app: any) {
  app.use(MORGAN(":method :url :status  - :response-time ms"));
  // parse application/x-www-form-urlencoded
  app.use(urlencoded({ extended: false }));
  // parse application/json
  app.use(json());
  app.use(helmet());
  app.use(compression({ level: 9 }));
  app.use(cors());
  app.use(allowCrossDomain);
  app.set("trust proxy", true);
}
