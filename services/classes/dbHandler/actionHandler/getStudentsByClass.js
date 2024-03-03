import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { ClassList } from "../../../../utilities/dbModels/user/classList.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";
import { CLASS_CONSTANT } from "../../common/constants";
export const getStudentsByClass = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.GET_STUDENTS_BY_CLASS,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    const result = await ClassList(event.schoolId)
      .find({
        _id: event.query.classId,
      })
      .select({
        className: 1,
        studentIds: 1,
        createdBy: 1,
      });
    return result ? { isSuccess: true, data: result } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.GET_STUDENTS_BY_CLASS,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_STUDENTS_BY_CLASS,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_STUDENTS_BY_CLASS
    );
  }
};
