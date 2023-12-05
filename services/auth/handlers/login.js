import { errorLog, infoLog } from "../../../utilities/logging/log";
import {
  badRequest,
  failResponse,
  internalServer,
  successResponse,
} from "../../../utilities/response";
import { validateSchema } from "../../../utilities/validation";
import loginSchema from "../requestSchema/loginSchema.json";
import { AUTH_CONSTANT } from "../common/constants";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { main } from "../dbHandler";
import { generatePBKDF2Hash } from "../../../utilities/crypto";
import jwt from "jsonwebtoken";
export const login = async (event) => {
  try {
    infoLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.LOGIN,
      data: event,
      message: GLOBAL_CONSTANT.INFO_MESSAGES.EVENT,
    });
    const parsedBody = JSON.parse(event.body);
    const validateRequest = validateSchema(loginSchema, parsedBody);
    if (validateRequest.isError) {
      errorLog({
        apiMethod: AUTH_CONSTANT.METHOD_NAME.LOGIN,
        data: GLOBAL_CONSTANT.ERROR_MESSAGES.VALIDATION_ERROR,
        message: validateRequest.message,
      });
      return badRequest(validateRequest.message);
    }
    let dbQuery = {
      actionType: AUTH_CONSTANT.ACTION_TYPE.GET_USER,
      query: parsedBody,
    };
    const userData = await main(dbQuery);

    if (!userData.isSuccess) {
      return failResponse(404, AUTH_CONSTANT.ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const hasedPassword = await generatePBKDF2Hash(parsedBody.password);
    if (hasedPassword !== userData.data.password) {
      return failResponse(401, AUTH_CONSTANT.ERROR_MESSAGES.WRONG_PASSWORD);
    }
    const data = {
      emailId: userData.data.emailId,
      userId: userData.data.userId,
      role:userData.data.role
    };
    const jwtToken = jwt.sign(data, process.env.key, {
      expiresIn: GLOBAL_CONSTANT.SESSION_EXPIRE,
    });
    const response = {
      userData: data,
      token: jwtToken,
    };

    return successResponse(
      AUTH_CONSTANT.SUCCESS_MESSAGES.PASSWORD_CHANGED,
      response
    );
  } catch (err) {
    errorLog({
      apiMethod: AUTH_CONSTANT.METHOD_NAME.LOGIN,
      data: err.message,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.HANDLER_ERROR);
  }
};
