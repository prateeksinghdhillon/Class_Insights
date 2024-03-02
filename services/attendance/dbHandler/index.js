import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { errorLog, infoLog } from "../../../utilities/logging/log";
import { ATTENDANCE_CONSTANT } from "../common/constants";
import { addAttendance } from "./actionHandler/addAttendance";
import { getAttendance } from "./actionHandler/getAttendance";
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
    case ATTENDANCE_CONSTANT.ACTION_TYPE.ADD_ATTENDANCE:
      return addAttendance(event);
      case ATTENDANCE_CONSTANT.ACTION_TYPE.GET_ATTENDANCE:
        return getAttendance(event);
  }
};
