export const GLOBAL_CONSTANT = {
  METHOD_NAME: {
    DB_HANDLER: "DB Handler",
    ACTION_HANDLER: "DB Action Handler",
  },
  ERROR_MESSAGES: {
    DATA_NOT_FOUND: "Data not found",
    HANDLER_ERROR: "Error in handler",
    DB_HANDLER_ERROR: "Error in DB handler main",
    CONNECTION_ERROR: "Error in DB connection",
    VALIDATION_ERROR: "Validation error",
    AGGERATE_QUERY_ERROR: "Error in DB aggregate query for collection ->",
    ACTION_FORBIDDED: "Not allowed to perform this action",
  },
  INFO_MESSAGES: {
    EVENT: "Logging event",
    PROCESS_EVENT: "Process event called with event",
    ACTION_HANDLER: "Action hadler logging",
  },
  OTP_EXPIRE_TIME: 5 * 60 * 1000, // in ms
  SESSION_EXPIRE: 60 * 60 * 24,
  USER_TYPE: {
    TEACHER: "teacher",
    ADMIN: "admin",
    STUDENT: "student",
  },
  OTP_TAG: {
    REGISTER: "register",
    FORGET_PASSWORD: "forgetPassword",
  },
};
