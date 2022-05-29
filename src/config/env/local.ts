export = {
  MONGO_DB_PROTOCAL: process.env.MONGO_DB_PROTOCAL || "mongodb+srv://", //protocal as local or srv
  MONGO_DB_URL: process.env.MONGO_DB_URL || "", // db url
  MONGO_DB_USER: process.env.MONGO_DB_USER || "", // db user
  MONGO_DB_PWD: process.env.MONGO_DB_PWD || "", // db password
  MONGO_DB: process.env.MONGO_DB || "", // database to connect
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || true, // true for print all logger data
  SECRET: process.env.SECRET || "", // jwt token secret
  APP_PORT: process.env.APP_PORT || "3001", // port of app
  APP_HOST: process.env.APP_HOST || "localhost", // host of app
  APP_CRED: process.env.APP_CRED || "tutor:bin", // intial app api access secrect
};
