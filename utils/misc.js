function errorWrapper(
  code,
  message = "There was an error in processing your request.",
  meta = {}
) {
  return {
    status: "error",
    code,
    message,
    meta,
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
  return stringValue?.replace(/['"]+/g, "");
}

function getResponse(status, code, message, data = {}, meta = {}) {
  let response = {};
  switch (status) {
    case "success": {
      response = successWrapper(code, message, data, meta);
      break;
    }

    case "error": {
      response = errorWrapper(code, message, meta);
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
