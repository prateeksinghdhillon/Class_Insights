import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import verifyOtpSchema from "../requestSchema/verifyOtpSchema.json";
import { AUTH_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";
import { generatePBKDF2Hash } from "../../../utilities/crypto";
export const verifyOtp = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.VERIFY_OTP,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });

    const parsedBody = JSON.parse(event.body);
    const validateRequest = validateSchema(verifyOtpSchema, parsedBody);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: AUTH_CONSTANT.METHOD_NAME.VERIFY_OTP,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    let dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.VERIFY_OTP,
      query: parsedBody,
    };
    const otpData = await main(dbQuery);

    if (otpData.isSuccess) {
      if (otpData.data.otp !== parsedBody.otp) {
        return failResponse(404, AUTH_CONSTANT.ERROR_MESSAGES.WORNG_OTP);
      }
    } else {
      return failResponse(404, AUTH_CONSTANT.ERROR_MESSAGES.WORNG_OTP);
    }
    const hasedPassword = await generatePBKDF2Hash(otpData.data.password);
    parsedBody["password"] = hasedPassword;
    dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.SAVE_PASSWORD,
      query: parsedBody,
    };
    const result = await main(dbQuery);
    if (result.isSuccess)
      return successResponse(AUTH_CONSTANT.SUCCESS_MESSAGES.PASSWORD_CHANGED);
    else return failResponse(500, GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.VERIFY_OTP,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });

    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};
