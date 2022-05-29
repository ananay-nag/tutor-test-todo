import express from "express";
import { LOG_LEVEL_TYPE } from "@app/common/constant";
import Utility from "@src/utils";
import { dbConnect } from "@src/config/db/dbHelper";
import { CONFIG } from "@src/config/index";
const app = express();
/*
  configure express
*/
import { expressConfig } from "@config/express";
expressConfig(app);
/*
  configure routes
*/
import appRouter from "@app/routes/index";
app.use("/", appRouter);

/*
  start server
*/
function startServer() {
  try {
    /*
      start db connection
    */
    Promise.all([dbConnect()])
      .then(() => {
        app.listen(CONFIG.APP_PORT, () => {
          Utility.goLogger("startServer", "ANANYA NAG", "server started", `App Server started at http://${CONFIG.APP_HOST}:${CONFIG.APP_PORT}`, LOG_LEVEL_TYPE.SUCCESS);
        });
      })
      .catch((err) => {
        Utility.goLogger("startServer", "ANANYA NAG", "db connect err", err, LOG_LEVEL_TYPE.ERROR);
        process.exit(0);
      });
  } catch (err) {
    Utility.goLogger("startServer", "ANANYA NAG", "server start err", err, LOG_LEVEL_TYPE.ERROR);
    startServer();
  }
}
startServer();
