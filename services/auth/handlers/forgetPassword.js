import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import forgetPasswordSchema from "../requestSchema/forgetPasswordSchema.json";
import { AUTH_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";
import { getOtp } from "../utils/generateOtp";
export const forgetPassword = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.FORGET_PASSWORD,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    const parsedBody = JSON.parse(event.body);
    const validateRequest = validateSchema(forgetPasswordSchema, parsedBody);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: AUTH_CONSTANT.METHOD_NAME.FORGET_PASSWORD,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    let dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.GET_USER,
      query: parsedBody,
    };
    const userData = await main(dbQuery);
    if (!userData.isSuccess) {
      return failResponse(400, AUTH_CONSTANT.ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const otp = process.env.stage === "prod" ? getOtp() : "123456";
    const data = {
      tag: GLOBAL_CONSTANT.OTP_TAG.FORGET_PASSWORD,
      otp: otp,
      emailId: parsedBody.emailId,
      userId: userData.data.userId,
      schoolId: parsedBody.schoolId,
      userType: userData.data.userType,
    };
    dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.SAVE_OTP,
      query: data,
    };
    const result = await main(dbQuery);
    if (result.isSuccess)
      return successResponse(AUTH_CONSTANT.SUCCESS_MESSAGES.OTP_SUCCESS);
    else return failResponse(500, GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.ADD_ADMIN_PASSWORD,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};
