import Ajv from "ajv";

const ajv = new Ajv();

const validateSchema = (schema, data) => {
  try {
    const flag = ajv.validate(schema, data);

    if (flag) {
      //validation passed, no errors
      return { isError: false };
    }

    //return validation error
    let path;
    if (ajv.errors[0]["instancePath"]) {
      path = " in " + ajv.errors[0]["instancePath"];
    } else {
      path = "";
    }
    console.log(ajv.errors)
    return { isError: true, message: ajv.errors[0]["message"] + path };
  } catch (err) {
    throw err;
  }
};

export { validateSchema };
