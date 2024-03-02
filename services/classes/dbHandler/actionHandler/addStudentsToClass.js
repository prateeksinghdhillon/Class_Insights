import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { ClassList } from "../../../../utilities/dbModels/user/classList.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";
import { CLASS_CONSTANT } from "../../common/constants";
export const addStudentsToClass = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_STUDENTS_TO_CLASS,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    const result = await ClassList(event.schoolId).findOneAndUpdate({
      _id: event.query.classId,
    },{
      studentIds:event.query.body.studentIds
    },{
      new:true,
      upsert:true
    });
    return result ? { isSuccess: true, data: result } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_STUDENTS_TO_CLASS,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.ADD_STUDENTS_TO_CLASS,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.ADD_STUDENTS_TO_CLASS
    );
  }
};
