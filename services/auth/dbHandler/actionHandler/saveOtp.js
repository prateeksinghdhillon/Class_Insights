import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { OtpStore } from "../../../../utilities/dbModels/auth/otpStore.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { AUTH_CONSTANT } from "../../common/constants";
export const saveOtp = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.ADD_ADMIN_PASSWORD,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });

    //transformation
    event.query.emailId = event.query.emailId.toLowerCase();
    const result = await OtpStore.findOneAndUpdate(
      {
        emailId: event.query.emailId,
      },
      {
        ...event.query,
        expireAt: new Date(Date.now() + GLOBAL_CONSTANT.OTP_EXPIRE_TIME), // Update expireAt to 5 minutes from now
      },
      { new: true, upsert: true }
    );

    return result ? { isSuccess: true } : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.ADD_ADMIN_PASSWORD,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        AUTH_CONSTANT.ACTION_TYPE.SAVE_OTP,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        AUTH_CONSTANT.ACTION_TYPE.SAVE_OTP
    );
  }
};
