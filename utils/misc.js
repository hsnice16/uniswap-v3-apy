function errorWrapper(
  code,
  message = "There was an error in processing your request."
) {
  return {
    status: "error",
    code,
    message,
  };
}

function successWrapper(
  code,
  message = "The request was processed successfully.",
  data = {},
  meta = {}
) {
  return {
    status: "success",
    code,
    message,
    data,
    meta,
  };
}

function removeQuotesFromString(stringValue) {
  return stringValue.replace(/['"]+/g, "");
}

function getResponse(status, code, message, data = {}, meta = {}) {
  let response = {};
  switch (status) {
    case "success": {
      response = successWrapper(code, message, data, meta);
      break;
    }

    case "error": {
      response = errorWrapper(code, message);
      break;
    }
  }

  return response;
}

module.exports = {
  errorWrapper,
  successWrapper,
  removeQuotesFromString,
  getResponse,
};
