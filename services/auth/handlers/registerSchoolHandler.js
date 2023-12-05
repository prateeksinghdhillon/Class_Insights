import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import schoolRegistration from "../requestSchema/schoolRegistration.json";
import { AUTH_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";
export const registerSchool = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.REGISTER_SCHOOL,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    const parsedBody = JSON.parse(event.body);
    const validateRequest = validateSchema(schoolRegistration, parsedBody);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: AUTH_CONSTANT.METHOD_NAME.REGISTER_SCHOOL,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    const dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.REGISTER_SCHOOL,
      query: parsedBody,
    };
    const result = await main(dbQuery);

    if (result.isSuccess)
      return successResponse(AUTH_CONSTANT.SUCCESS_MESSAGES.REGISTER_SUCCESS);
    else return failResponse(500, GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.REGISTER_SCHOOL,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};
