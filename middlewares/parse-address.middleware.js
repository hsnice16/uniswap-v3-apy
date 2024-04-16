const { getResponse, removeQuotesFromString } = require("../utils/misc");

function parseAddress(req, res, next) {
  let queryStatus;
  let code;
  let message;
  let meta = {};

  switch (req.originalUrl) {
    case "/v1/apy": {
      console.log(
        req.method,
        " /v1/apy - req.query: ",
        JSON.stringify(req.query),
        " - iso_date_string: ",
        new Date().toISOString()
      );

      let { poolAddress } = req.query;
      poolAddress = removeQuotesFromString(poolAddress?.trim());

      if (poolAddress === undefined || poolAddress === "") {
        queryStatus = "error";
        code = 400;
        message = "`poolAddress` does not have a correct value.";
        meta = {
          reason:
            "The `poolAddress` query parameter is required. So, make sure its value is not an undefined or empty string (after trimming and removing any extra quotes).",
        };
      } else {
        req.query.poolAddress = poolAddress;
      }

      break;
    }

    case "/v1/pool": {
      console.log(
        req.method,
        " /v1/pool - req.body: ",
        JSON.stringify(req.body),
        " - iso_date_string: ",
        new Date().toISOString()
      );

      let { address } = req.body;
      address = removeQuotesFromString(address?.trim());

      if (address === undefined || address === "") {
        queryStatus = "error";
        code = 400;
        message = "`address` does not have a correct value.";
        meta = {
          reason:
            "The `address` body parameter is required. So, make sure its value is not an undefined or empty string (after trimming and removing any extra quotes).",
        };
      } else {
        req.body.address = address;
      }

      break;
    }
  }

  if (queryStatus === "error") {
    const response = getResponse(queryStatus, code, message, {}, meta);
    console.log(
      req.method,
      req.originalUrl,
      " - response: ",
      JSON.stringify(response),
      " - iso_date_string: ",
      new Date().toISOString()
    );

    res.status(code).json(response);
  } else {
    next();
  }
}

module.exports = {
  parseAddress,
};
