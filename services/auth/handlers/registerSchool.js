// import { main } from "../db/index";

import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import schoolRegistration from "../requestSchema/schoolRegistration.json";
import { AUTH_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
export const registerSchool = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.REGISTER_SCHOOL,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    const body = JSON.parse(event.body);
    const validateRequest = validateSchema(schoolRegistration, body);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: AUTH_CONSTANT.METHOD_NAME.REGISTER_SCHOOL,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    // let dbQuery = {
    //   actionType: "getAllData",
    //   query: event.query,
    // };
    // let result = await main(dbQuery);
    let fire;
    console.log(fire.toLowerCase());

    // if (result.statusCode === "[200]") return su;
    // else return failResponse(result);
    return successResponse("success", []);
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.REGISTER_SCHOOL,
      data: err.message,
      message: AUTH_CONSTANT.ERROR_MESSAGES.DB_HANDLER_ERROR,
    });
    console.log(err.message);
    throw internalServer(AUTH_CONSTANT.ERROR_MESSAGES.REGISTER_SCHOOL_HANDLER);
  }
};
