import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import changePasswordSchema from "../requestSchema/changePasswordSchema.json";
import { AUTH_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler/index";
import { generatePBKDF2Hash } from "../../../utilities/crypto";
export const changePassword = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.CHANGE_PASSWORD,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    if (!event.requestContext.authorizer.schoolId) {
      throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
    }
    const parsedBody = JSON.parse(event.body);
    const validateRequest = validateSchema(changePasswordSchema, parsedBody);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: AUTH_CONSTANT.METHOD_NAME.CHANGE_PASSWORD,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    if (parsedBody.newPassword != parsedBody.confirmNewPassword) {
      return failResponse(400, AUTH_CONSTANT.ERROR_MESSAGES.PASSWORD_MISMATCH);
    }
    let dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.GET_USER,
      query: {
        emailId: event.requestContext.authorizer.emailId,
        schoolId: event.requestContext.authorizer.schoolId,
      },
    };
    const userRes = await main(dbQuery);
    let hasedPassword = await generatePBKDF2Hash(parsedBody.oldPassword);
    if (userRes.isSuccess && hasedPassword != userRes.data.password) {
      return failResponse(400, AUTH_CONSTANT.ERROR_MESSAGES.WORNG_PASSWORD);
    }
    if (parsedBody.newPassword === parsedBody.oldPassword) {
      return failResponse(400, AUTH_CONSTANT.ERROR_MESSAGES.SAME_PASSWORD);
    }
    hasedPassword = await generatePBKDF2Hash(parsedBody.newPassword);
    dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.CHANGE_PASSWORD,
      query: {
        password: hasedPassword,
        emailId: event.requestContext.authorizer.emailId,
      },
      schoolId: event.requestContext.authorizer.schoolId,
    };
    const result = await main(dbQuery);
    if (result.isSuccess)
      return successResponse(AUTH_CONSTANT.SUCCESS_MESSAGES.PASSWORD_CHANGED);
    else return failResponse(500, GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.CHANGE_PASSWORD,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};
