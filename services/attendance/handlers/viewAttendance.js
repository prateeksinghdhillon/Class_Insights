import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
 // badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { ATTENDANCE_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";

export const viewAttendance = async (event) => {
  try {
    infoLog({
      apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.VIEW_ATTENDANCE,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    if (event.requestContext.authorizer.role !== "admin" && event.requestContext.authorizer.role !== "teacher") {
      return failResponse(403, GLOBAL_CONSTANT.ERROR_MESSAGES.ACTION_FORBIDDED);
    }
    if (!event.requestContext.authorizer.schoolId) {
      throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
    }
    let dbQuery = {
      actionType: ATTENDANCE_CONSTANT.ACTION_TYPE.GET_ATTENDANCE,
      query: event.queryStringParameters,
      schoolId: event.requestContext.authorizer.schoolId,
      principalId: event.requestContext.authorizer.emailId,
    };
    const result = await main(dbQuery);
    if (result.isSuccess)
      return successResponse(
        ATTENDANCE_CONSTANT.SUCCESS_MESSAGES.ATTENDANCE_FETCHED,
        result.data
      );
    else return failResponse(500, GLOBAL_CONSTANT.ERROR_MESSAGES.DATA_NOT_FOUND);
  } catch (err) {
    errorLog({
      apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.TAKE_ATTENDANCE,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};
