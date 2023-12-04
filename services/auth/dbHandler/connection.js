import { connect } from "mongoose";
let connection = null;

import { internalServer } from "../../../utilities/response";
import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { errorLog } from "../../../utilities/logging/log";
export async function makeDBConnection() {
  try {
    if (!connection) {
      connection = await connect(process.env.DB_URL, {
        useUnifiedTopology: true,
      });
    }
    return "connection established";
  } catch (err) {
    errorLog({
      apiMethod: GLOBAL_CONSTANT.METHOD_NAME.DB_HANDLER,
      data: err,
      message: GLOBAL_CONSTANT.ERROR_MESSAGES.CONNECTION_ERROR,
    });
    throw internalServer(GLOBAL_CONSTANT.ERROR_MESSAGES.CONNECTION_ERROR);
  }
}
