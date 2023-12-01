import { GLOBAL_CONSTANT } from "../../../utilities/common/globalConstant";
import { errorLog, infoLog } from "../../../utilities/logging/log";
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
  }
};
