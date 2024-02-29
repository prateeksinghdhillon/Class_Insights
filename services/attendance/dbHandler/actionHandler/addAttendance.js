import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { Attendance } from "../../../../utilities/dbModels/attendance/attendance.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { ATTENDANCE_CONSTANT } from "../../common/constants";
export const addAttendance = async (event) => {
  try {
    infoLog({
      apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.TAKE_ATTENDANCE,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });

    const result = await Attendance(event.schoolId).findOneAndUpdate(
      { $and: [{ classId: event.query.classId }, { date: event.query.date }] },
      event.query,
      {
        new: true,
        upsert: true,
      }
    );

    return result && result.length > 0
      ? { isSuccess: true, data: result }
      : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.TAKE_ATTENDANCE,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        ATTENDANCE_CONSTANT.ACTION_TYPE.ADD_ATTENDANCE,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        ATTENDANCE_CONSTANT.ACTION_TYPE.ADD_ATTENDANCE
    );
  }
};
