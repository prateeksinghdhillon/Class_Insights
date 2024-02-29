import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  //badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { CLASS_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";
export const getTeachers = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.GET_TEACHERS,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    if (event.requestContext.authorizer.role !== "admin") {
      return failResponse(403, GLOBAL_CONSTANT.ERROR_MESSAGES.ACTION_FORBIDDED);
    }
    if (!event.requestContext.authorizer.schoolId) {
      throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
    }
    let dbQuery = {
      actionType: CLASS_CONSTANT.ACTION_TYPE.GET_TEACHERS,
      query: {},
      schoolId: event.requestContext.authorizer.schoolId,
    };
    const res = await main(dbQuery);
    if (res.isSuccess)
      return successResponse(CLASS_CONSTANT.SUCCESS_MESSAGES.GET_TEACHERS,res);
    else return failResponse(500, GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.GET_TEACHERS,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};