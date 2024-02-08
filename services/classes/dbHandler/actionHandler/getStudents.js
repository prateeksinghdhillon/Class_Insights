import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
 import { StudentModel } from "../../../../utilities/dbModels/user/studentMaster.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";
import { CLASS_CONSTANT } from "../../common/constants";
export const getStudents = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.GET_STUDENTS,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    const result = await StudentModel(event.schoolId).find({}).select({ name:1,emailId:1});
    return result ? { isSuccess: true, data: result } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.GET_STUDENTS,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_STUDENTS,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_STUDENTS
    );
  }
};
