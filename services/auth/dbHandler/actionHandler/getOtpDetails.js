import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { OtpStore } from "../../../../utilities/dbModels/auth/otpStore.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { AUTH_CONSTANT } from "../../common/constants";
export const getOtpDetails = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.VERIFY_OTP,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    event.query.emailId = event.query.emailId.toLowerCase();
    const result = await OtpStore.findOne({
      $and: [
        { schoolId: event.query.schoolId },
        { emailId: event.query.emailId },
      ],
    });
    if (result) {
      const updatedAt = new Date(result.updatedAt);
      const expireAt = new Date(result.expireAt);

      if (Math.abs(new Date() - updatedAt) > Math.abs(expireAt - updatedAt)) {
        return { isSuccess: false };
      }
    }
    return result ? { isSuccess: true, data: result } : { isSuccess: false };
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
