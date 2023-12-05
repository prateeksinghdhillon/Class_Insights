import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { IdCount } from "../../../../utilities/dbModels/auth/idcount.modal";
import { RegisteredSchools } from "../../../../utilities/dbModels/auth/registeredSchool.modal";
import { UserModel } from "../../../../utilities/dbModels/auth/users.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { AUTH_CONSTANT } from "../../common/constants";
export const savePassword = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.VERIFY_OTP,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    const result = await RegisteredSchools.findOneAndUpdate(
      {
        $and: [
          { schoolId: event.query.schoolId },
          { enlisterEmail: event.query.emailId },
        ],
      },
      {
        $set: {
          enlisterPassword: event.query.password,
        },
      },
      { new: true }
    );
    const idCount = await IdCount.find(
      { countType: "userIdCount" },
      { $inc: { sequenceValue: 1 } }
    );
    event.query["userId"] = idCount.sequenceValue;
    event.query["role"] = "admin";
    let userRes = await UserModel(event.query.schoolId).create(event.query);
    // const result =
    return result && userRes ? { isSuccess: true } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.VERIFY_OTP,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        AUTH_CONSTANT.ACTION_TYPE.VERIFY_OTP,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        AUTH_CONSTANT.ACTION_TYPE.VERIFY_OTP
    );
  }
};
