import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { TeacherModel } from "../../../../utilities/dbModels/user/teacherMaster.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { CLASS_CONSTANT } from "../../common/constants";
export const getTeacherByDetails = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_TEACHER,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    const result = await TeacherModel(event.schoolId).find({
      $or: [
        {
          $and: [
            {
              name: event.query.name,
            },
            {
              gender: event.query.gender,
            },
            {
              contactNumber: event.query.contactNumber,
            },
          ],
        },
        {
          emailId: event.query.emailId,
        },
        {
          contactNumber: event.query.contactNumber,
        },
      ],
    });
    return result && result.length > 0
      ? { isSuccess: true, data: result }
      : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_TEACHER,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_TEACHER_BY_DETAILS,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_TEACHER_BY_DETAILS
    );
  }
};

export const addTeacher = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_TEACHER,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    event.query["createdBy"] = event.principalId;
    const result = await TeacherModel(event.schoolId).create(event.query);
    return result ? { isSuccess: true, data: result } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_TEACHER,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.ADD_TEACHER,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.ADD_TEACHER
    );
  }
};
