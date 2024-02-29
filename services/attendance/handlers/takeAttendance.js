import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import takeAttendanceSchema from "../requestSchema/takeAttendanceSchema.json";
import { ATTENDANCE_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";
import {
  dateFormats,
  formatDate,
  subtractDate,
} from "../../../utilities/moment";
export const takeAttendance = async (event) => {
  try {
    infoLog({
      apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.TAKE_ATTENDANCE,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    if (event.requestContext.authorizer.role !== "admin"||event.requestContext.authorizer.role !== "teacher") {
      return failResponse(403, GLOBAL_CONSTANT.ERROR_MESSAGES.ACTION_FORBIDDED);
    }
    if (!event.requestContext.authorizer.schoolId) {
      throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
    }
    const parsedBody = JSON.parse(event.body);
    const validateRequest = validateSchema(takeAttendanceSchema, parsedBody);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.TAKE_ATTENDANCE,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    if (parsedBody.data > formatDate(new Date(), dateFormats.YYYYMMDDHHmmss)) {
      failResponse(400, ATTENDANCE_CONSTANT.ERROR_MESSAGES.FUTURE_DATE);
    } else if (
      parsedBody.data <
      subtractDate(new Date(), 2, "days", dateFormats.YYYYMMDDHHmmss)
    ) {
      failResponse(400, ATTENDANCE_CONSTANT.ERROR_MESSAGES.PAST_DATE);
    }
    parsedBody["attendanceTaker"] = event.requestContext.authorizer.emailId;
    let dbQuery = {
      actionType: ATTENDANCE_CONSTANT.ACTION_TYPE.ADD_ATTENDANCE,
      query: parsedBody,
      schoolId: event.requestContext.authorizer.schoolId,
      principalId: event.requestContext.authorizer.emailId,
    };
    const result = await main(dbQuery);
    if (result.isSuccess)
      return successResponse(
        ATTENDANCE_CONSTANT.SUCCESS_MESSAGES.ATTENDANCE_SAVED
      );
    else return failResponse(500, GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  } catch (err) {
    errorLog({
      apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.TAKE_ATTENDANCE,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};
