import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { errorLog, infoLog } from "../../../utilities/logging/log";
import { AUTH_CONSTANT } from "../common/constants";
import { getOtpDetails } from "./actionHandler/getOtpDetails";
import { getSchoolById } from "./actionHandler/getSchoolById";
import { getUser } from "./actionHandler/getUser";
import { saveOtp } from "./actionHandler/saveOtp";
import { savePassword } from "./actionHandler/savePassword";
import { saveRegisterSchool } from "./actionHandler/saveRegisterSchool";
import { makeDBConnection } from "./connection";

export async function main(event) {
  try {
    await makeDBConnection();
    let result = await processEvent(event);
    return result;
  } catch (err) {
    errorLog({
      apiMethod: GLOBAL_CONSTANT.METHOD_NAME.DB_HANDLER,
      data: err,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.DB_HANDLER_ERROR,
    });
    return err;
  }
}
const processEvent = async (event) => {
  infoLog({
    apiMethod: GLOBAL_CONSTANT.METHOD_NAME.DB_HANDLER,
    data: event,
    message: GLOBAL_CONSTANT.INFO_MESSAGES.PROCESS_EVENT,
  });
  switch (event.actionType) {
    case AUTH_CONSTANT.ACTION_TYPE.REGISTER_SCHOOL:
      return saveRegisterSchool(event);
    case AUTH_CONSTANT.ACTION_TYPE.GET_SCHOOL_BY_ID:
      return getSchoolById(event);
    case AUTH_CONSTANT.ACTION_TYPE.SAVE_OTP:
      return saveOtp(event);
    case AUTH_CONSTANT.ACTION_TYPE.VERIFY_OTP:
      return getOtpDetails(event);
    case AUTH_CONSTANT.ACTION_TYPE.SAVE_PASSWORD:
      return savePassword(event);
    case AUTH_CONSTANT.ACTION_TYPE.GET_USER:
      return getUser(event);
  }
};
