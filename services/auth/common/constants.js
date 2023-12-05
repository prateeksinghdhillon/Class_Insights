export const AUTH_CONSTANT = {
  METHOD_NAME: {
    REGISTER_SCHOOL: "registerSchool",
    ADD_ADMIN_PASSWORD: "addAdminPassword",
    VERIFY_OTP: "verifyOtp",
    LOGIN: "login",
  },
  ACTION_TYPE: {
    REGISTER_SCHOOL: "registerSchool",
    GET_SCHOOL_BY_ID: "getSchoolByID",
    SAVE_OTP: "saveOtp",
    VERIFY_OTP: "verifyOtp",
    SAVE_PASSWORD: "savePassword",
    GET_USER: "getUser",
  },
  ERROR_MESSAGES: {
    USER_NOT_FOUND: "User not found",
    SCHOOL_NOT_FOUND: "School not found",
    REGISTER_SCHOOL_HANDLER: "Error in register school",
    ADD_ADMIN_PASSWORD_USER: "User not found for this school Id",
    WRONG_SCHOOL_ID: "Wrong school Id",
    WRONG_OTP: "Incorrect OTP",
    WRONG_PASSWORD: "Incorrect password",
  },
  SUCCESS_MESSAGES: {
    REGISTER_SUCCESS: "School registered successfully",
    OTP_SUCCESS: "OTP sent successfully",
    PASSWORD_CHANGED: "Password changed successfully",
    LOGGED_IN: "Logged in successfully",
  },
};
