import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { RegisteredSchools } from "../../../../utilities/dbModels/auth/registeredSchool.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { AUTH_CONSTANT } from "../../common/constants";
export const getSchoolById = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.ADD_ADMIN_PASSWORD,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    console.log(event);

    const result = await RegisteredSchools.findOne({ schoolId: event.query });
    console.log(result);

    return result ? { isSuccess: true, data: result } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.ADD_ADMIN_PASSWORD,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        AUTH_CONSTANT.ACTION_TYPE.ADD_ADMIN_PASSWORD,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        AUTH_CONSTANT.ACTION_TYPE.ADD_ADMIN_PASSWORD
    );
  }
};
