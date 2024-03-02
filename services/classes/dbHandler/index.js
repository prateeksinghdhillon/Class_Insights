import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { errorLog, infoLog } from "../../../utilities/logging/log";
import { CLASS_CONSTANT } from "../common/constants";
import { addStudentsToClass } from "./actionHandler/addStudentsToClass";
import { addClasses } from "./actionHandler/addClasses";
import { addStudent, getStudentByDetails } from "./actionHandler/addStudent";
import { getStudentsByClass } from "./actionHandler/getStudentsByClass";
import { addTeacher, getTeacherByDetails } from "./actionHandler/addTeachers";
import { getClass } from "./actionHandler/getClass";
import { getStudents } from "./actionHandler/getStudents";
import { getTeachers } from "./actionHandler/getTeachers";
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
    case CLASS_CONSTANT.ACTION_TYPE.GET_CLASS:
      return getClass(event);
    case CLASS_CONSTANT.ACTION_TYPE.ADD_CLASS:
      return addClasses(event);
    case CLASS_CONSTANT.ACTION_TYPE.GET_TEACHER_BY_DETAILS:
      return getTeacherByDetails(event);
    case CLASS_CONSTANT.ACTION_TYPE.ADD_TEACHER:
      return addTeacher(event);
    case CLASS_CONSTANT.ACTION_TYPE.GET_STTUDENT_BY_DETAILS:
      return getStudentByDetails(event);
    case CLASS_CONSTANT.ACTION_TYPE.ADD_STUDENT:
      return addStudent(event);
    case CLASS_CONSTANT.ACTION_TYPE.GET_TEACHERS:
      return getTeachers(event);
    case CLASS_CONSTANT.ACTION_TYPE.GET_STUDENTS:
      return getStudents(event);
      case CLASS_CONSTANT.ACTION_TYPE.GET_STUDENTS_BY_CLASS:
        return getStudentsByClass(event);
        case CLASS_CONSTANT.ACTION_TYPE.ADD_STUDENTS_TO_CLASS:
      return addStudentsToClass(event);
  }
};
