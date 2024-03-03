import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import { Attendance } from "../../../../utilities/dbModels/attendance/attendance.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { ATTENDANCE_CONSTANT } from "../../common/constants";
export const getAttendance = async (event) => {
  try {
    infoLog({
      apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.VIEW_ATTENDANCE,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });

    const result = await Attendance(event.schoolId).findOne(
      { $and: [{ classId: event.query.classId }, { date: event.query.date }] },
    );
    return result
      ? { isSuccess: true, data: result }
      : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: ATTENDANCE_CONSTANT.METHOD_NAME.VIEW_ATTENDANCE,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        ATTENDANCE_CONSTANT.ACTION_TYPE.GET_ATTENDANCE,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        ATTENDANCE_CONSTANT.ACTION_TYPE.GET_ATTENDANCE
    );
  }
};
