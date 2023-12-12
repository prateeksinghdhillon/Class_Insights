import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { ClassList } from "../../../../utilities/dbModels/user/classList.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { CLASS_CONSTANT } from "../../common/constants";
export const addClasses = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_CLASS,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    const data = event.query.classNames.map((ele) => {
      return {
        className: ele,
        createdBy: event.principalId,
      };
    });
    const result = await ClassList(event.schoolId).insertMany(data);

    return result && result.length > 0
      ? { isSuccess: true, data: result }
      : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_CLASS,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.ADD_CLASS,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.ADD_CLASS
    );
  }
};
