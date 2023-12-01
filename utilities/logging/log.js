const infoLog = (data) => {
  try {
    let currentTime = new Date();
    if (typeof data == "string") {
      console.log("string log => ", data, " at ", currentTime);
    }
    if (typeof data == "object") {
      data.logType = "info";
      data.dt = currentTime;
      console.log("Info log =>", JSON.stringify(data));
    }
  } catch (err) {
    console.log("Error in Logging info funcion ", JSON.stringify(err));
  }
};
const errorLog = (data) => {
  try {
    let currentTime = new Date();
    if (typeof data == "string") {
      console.log("string log => ", data, " at ", currentTime);
    }
    if (typeof data == "object") {
      data.logType = "error";
      data.dt = currentTime;
      console.log(data)
      console.log("Error log =>", JSON.stringify(data));
    }
  } catch (err) {
    console.log("Error in Logging error funcion ", JSON.stringify(err));
  }
};

export { infoLog, errorLog };
