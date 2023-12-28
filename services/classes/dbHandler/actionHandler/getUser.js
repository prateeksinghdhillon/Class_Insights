import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { UserModel } from "../../../../utilities/dbModels/auth/users.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { CLASS_CONSTANT, CLASS_CONSTANT } from "../../common/constants";
export const getUser = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.CHANGE_PASSWORD,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    event.query.emailId = event.query.emailId.toLowerCase();
    const result = await UserModel(event.query.schoolId).findOne({
      $and: [{ emailId: event.query.emailId }],
    });

    return result ? { isSuccess: true, data: result } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.CHANGE_PASSWORD,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_USER,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_USER
    );
  }
};
