function errorWrapper(
  code,
  message = "There was some error in processing your request.",
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

function calculateApy(feesUSD, volumeUSD) {
  feesUSD = parseFloat(parseFloat(feesUSD).toFixed(4));
  volumeUSD = parseFloat(parseFloat(volumeUSD).toFixed(4));

  const last24hrsReturn = (feesUSD / volumeUSD) * 100;
  const apy = ((1 + last24hrsReturn / 365) ** 365 - 1) * 100;

  return parseFloat(apy.toFixed(4));
}

module.exports = {
  errorWrapper,
  successWrapper,
  removeQuotesFromString,
  getResponse,
  calculateApy,
};
