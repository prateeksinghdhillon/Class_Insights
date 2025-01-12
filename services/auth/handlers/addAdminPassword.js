import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import addAdminPasswordSchema from "../requestSchema/addAdminPasswordSchema.json";
import { AUTH_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";
import { getOtp } from "../utils/generateOtp";
export const addAdminPassword = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.ADD_ADMIN_PASSWORD,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    const parsedBody = JSON.parse(event.body);
    const validateRequest = validateSchema(addAdminPasswordSchema, parsedBody);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: AUTH_CONSTANT.METHOD_NAME.ADD_ADMIN_PASSWORD,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    let dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.GET_SCHOOL_BY_ID,
      query: parsedBody.schoolId,
    };
    const schooldata = await main(dbQuery);
    if (schooldata.isSuccess) {
      if (schooldata.data.enlisterEmail !== parsedBody.emailId.toLowerCase()) {
        return failResponse(404, AUTH_CONSTANT.ERROR_MESSAGES.USER_NOT_FOUND);
      }
    } else {
      return failResponse(404, AUTH_CONSTANT.ERROR_MESSAGES.SCHOOL_NOT_FOUND);
    }
    const otp = process.env.stage === "prod" ? getOtp() : "123456";
    parsedBody["otp"] = otp;
    dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.SAVE_OTP,
      query: parsedBody,
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
