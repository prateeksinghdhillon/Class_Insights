import { GLOBAL_CONSTANT } from "../../../../utilities/common/globalConstant";
import {
  generatePBKDF2Hash,
  generateRandomPassword,
} from "../../../../utilities/crypto";
import { UserModel } from "../../../../utilities/dbModels/auth/users.modal";
import { StudentModel } from "../../../../utilities/dbModels/user/studentMaster.modal";
import { errorLog, infoLog } from "../../../../utilities/logging/log";
import { internalServer } from "../../../../utilities/response";

import { CLASS_CONSTANT } from "../../common/constants";
export const getStudentByDetails = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_STUDENT,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    const result = await StudentModel(event.schoolId).find({
      $or: [
        {
          $and: [
            {
              name: event.query.name,
            },
            {
              gender: event.query.gender,
            },
            {
              dob: event.query.dob,
            },
            {
              fatherName: event.query.fatherName,
            },
            {
              motherName: event.query.motherName,
            },
          ],
        },
      ],
    });
    return result && result.length > 0
      ? { isSuccess: true, data: result }
      : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_STUDENT,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_STTUDENT_BY_DETAILS,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.GET_STTUDENT_BY_DETAILS
    );
  }
};

export const addStudent = async (event) => {
  try {
    infoLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_STUDENT,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.ACTION_HANDLER,
    });
    event.query["emailId"] =
      event.query["name"].split(" ")[0] +
      "." +
      event.query["name"].split(" ")[1] +
      "_" +
      event.query["dob"].substring(6, 8) +
      event.query["dob"].substring(4, 6);
    let emailFound = true;
    let c = 1;
    while (emailFound) {
      emailFound =
        !(await StudentModel(event.schoolId).findOne({
          emailId: event.query.emailId,
        }).length) === 0;
      event.query["emailId"] =
        event.query["emailId"].split("_")[0] +
        c +
        "_" +
        event.query["emailId"].split("_")[1];
      c += 1;
    }
    event.query["initialPassword"] = generateRandomPassword(8);
    event.query["createdBy"] = event.principalId;
    const result = await StudentModel(event.schoolId).create(event.query);
    let userRes;
    if (result) {
      const user = {
        schoolId: event.schoolId,
        emailId: result.emailId.toLowerCase(),
        role: "student",
        userId: result._id,
        userType: "student",
        password: await generatePBKDF2Hash(result.initialPassword),
      };
      userRes = await UserModel(event.schoolId).create(user);
    }
    return result && userRes
      ? { isSuccess: true, data: result }
      : { isSuccess: false };
  } catch (err) {
    errorLog({
      apiMethod: CLASS_CONSTANT.METHOD_NAME.ADD_STUDENT,
      data: err,
      message:
        GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.ADD_STUDENT,
    });
    throw internalServer(
      GLOBAL_CONSTANT.ERROR_MESSAGES.AGGERATE_QUERY_ERROR +
        CLASS_CONSTANT.ACTION_TYPE.ADD_STUDENT
    );
  }
};
