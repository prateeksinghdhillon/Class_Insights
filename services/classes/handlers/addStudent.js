import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import addStudentSchema from "../requestSchema/addStudentSchema.json";
import { CLASS_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";
export const addStudent = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_STUDENT,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    if (event.requestContext.authorizer.role !== "admin") {
      return failResponse(403, GLOBAL_CONSTANT.ERROR_MESSAGES.ACTION_FORBIDDED);
    }
    if (!event.requestContext.authorizer.schoolId) {
      throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
    }
    const parsedBody = JSON.parse(event.body);
    const validateRequest = validateSchema(addStudentSchema, parsedBody);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_CLASS,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    let dbQuery = {
      actionType: CLASS_CONSTANT.ACTION_TYPE.GET_STTUDENT_BY_DETAILS,
      query: parsedBody,
      schoolId: event.requestContext.authorizer.schoolId,
    };
    const res = await main(dbQuery);
    if (res.isSuccess) {
      return failResponse(400, CLASS_CONSTANT.ERROR_MESSAGES.STUDENT_EXISTS);
    }
    dbQuery = {
      actionType: CLASS_CONSTANT.ACTION_TYPE.ADD_STUDENT,
      query: parsedBody,
      schoolId: event.requestContext.authorizer.schoolId,
      principalId: event.requestContext.authorizer.emailId,
    };
    const result = await main(dbQuery);
    if (result.isSuccess)
      return successResponse(CLASS_CONSTANT.SUCCESS_MESSAGES.ADD_STUDENT);
    else return failResponse(500, GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_STUDENT,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};
