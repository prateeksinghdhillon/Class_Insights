export const successResponse = (message, data = []) => {
  let response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
  },
    body: JSON.stringify({
      message: message,
      data: data,
    }),
  };
  return response;
};

export const badRequest = (message) => {
  let response = {
    body: JSON.stringify({
      message: message,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
  },
    statusCode: 400,
  };
  return response;
};

export const sendErrorMsg = () => {
  return {
    statusCode: "[501]",
    message: "Not a valid action to be performed",
    data: [],
  };
};

export const internalServer = (message) => {
  let response = {
    body: JSON.stringify({
      message: message,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
  },
    statusCode: 500,
  };
  return response;
};
export function failResponse(statusCode, message, data = []) {
  let response = {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
  },
    body: JSON.stringify({
      message: message,
      data: data,
    }),
  };
  return response;
}
