import { LOG_LEVEL_TYPE } from "@app/common/constant";
import { CONFIG } from "@src/config/index";
import Utility from "@src/utils";
import { connect, ConnectOptions, set } from "mongoose";

/**
 *
 * @returns mongodb db
 */
export async function dbConnect() {
  Utility.goLogger("dbConnect", "ANANYA NAG", "DB trying to connect from", CONFIG.MONGO_DB_URL, LOG_LEVEL_TYPE.INFO);
  const { MONGO_DB_URL, MONGO_DB_USER, MONGO_DB_PWD, MONGO_DB_PROTOCAL, MONGO_DB } = CONFIG;
  const options: ConnectOptions = {
    retryWrites: true,
    w: "majority",
  };
  if (MONGO_DB_USER) options.user = MONGO_DB_USER;
  if (MONGO_DB_PWD) options.pass = MONGO_DB_PWD;
  set("debug", true);
  console.log(`${MONGO_DB_PROTOCAL}${MONGO_DB_URL}/${MONGO_DB}`);
  return await connect(`${MONGO_DB_PROTOCAL}${MONGO_DB_URL}/${MONGO_DB}`, options)
    .then((data) => {
      Utility.goLogger("dbConnect", "ANANYA NAG", "db connect success", {}, LOG_LEVEL_TYPE.SUCCESS);
      return data.connection.db;
    })
    .catch((err) => {
      Utility.goLogger("dbConnect", "ANANYA NAG", "db connect err", { err }, LOG_LEVEL_TYPE.WARN);
      throw new Error(err);
    });
}
