import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { IdCount } from "../../../../utilities/dbModels/auth/idcount.modal";
import { RegisteredSchools } from "../../../../utilities/dbModels/auth/registeredSchool.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { AUTH_CONSTANT } from "../../common/constants";
export const saveRegisterSchool = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.REGISTER_SCHOOL,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });

    const idCount = await IdCount.find(
      { countType: "schoolIdCount" },
      { $inc: { sequenceValue: 1 } }
    );
    event.query["schoolId"] = idCount.sequenceValue;
    //transformation
    event.query.enlisterEmail = event.query.enlisterEmail.toLowerCase();
    const result = await RegisteredSchools.create(event.query);

    return result ? { isSuccess: true } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.REGISTER_SCHOOL,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        AUTH_CONSTANT.ACTION_TYPE.REGISTER_SCHOOL,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        AUTH_CONSTANT.ACTION_TYPE.REGISTER_SCHOOL
    );
  }
};
