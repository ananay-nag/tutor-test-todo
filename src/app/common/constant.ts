export const HTTP = {
  STATUS: {
    SUCCESS: true,
    FAILURE: false,
  },
  RES_CODE: {
    UNAUTHORIZED: 401,
    INVALID_TRANSACTION: 402,
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    OK: 200,
    NO_CONTENT_FOUND: 204,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TOO_MANY_REQUEST: 429,
    NOT_ACCEPTABLE: 406,
  },
};
export const LOG_LEVEL_TYPE = {
  INFO: "INFO",
  ERROR: "ERROR",
  WARN: "WARN",
  SUCCESS: "SUCCESS",
};
export const LOG_LEVEL_COLOR = {
  INFO: "\x1b[34m %s \x1b[0m",
  ERROR: "\x1b[31m %s \x1b[0m",
  WARN: "\x1b[33m %s \x1b[0m",
  SUCCESS: "\x1b[32m %s \x1b[0m",
};
export const CUSTOM_ERROR_NAME = {
  INCOMPLETE_PARAM: "IncompleteParam",
  DATA_NOT_FOUND: "DataNotFound",
  EXECUSTION_FAILED: "ExecustionFailed",
  TOKEN_ERROR: "TokenError",
  SESSION_ERROR: "SessionError",
};
export const SESSION = {
  EXPIRE: {
    DAY: 86400, // 1 day
    MONTH: 2592000, // 1 month (30days)
    HOUR: 3600, // 1 hour
    MIN: 60,
    SEC: 1,
  },
};

export const SUCCESS_MESSAGE = {
  SUCCESS: "success",
  TOKEN_GENERATED: "Token generate successfully",
  TASK_CREATED: "Todo Task created successfully",
  TASK_LIST: "Todo Task get successfully",
  TASK_UPDATE: "Todo Task updated successfully",
};

export const FAILURE_MESSAGE = {
  AUTHORIZATION: {
    REQUIRED: "Authorization Required",
    INVALID: "Authorization Method Invalid",
    FAILED: "Authorization Failed",
  },
  AUTHENTICATION: {},
  TOKEN: {
    NOT_PROVIDED: "No token provided!",
    INVALID: "Invalid token",
    CREATE: "Token Creation Failed",
  },
  SESSION: {
    FAILED: "Session Validation Failed",
  },
  PARAMS: {
    INCOMPLETE: "Incomplete parameter",
  },
  INTERNAL_SERVER_ERROR: "internal server error",
};

export const DB_NAMES = {
  TODOS: "todos",
  SESSIONS: "sessions",
};

export enum TODO_STATUS {
  OPEN = 1,
  IN_PROGRESS = 2,
  DONE = 3,
  DELETED = 4,
}
