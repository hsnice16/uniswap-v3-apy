const express = require("express");
const router = express.Router();
const { removeQuotesFromString, getResponse } = require("../utils/misc");

router.route("/").get((req, res) => {
  console.log(
    "GET /apy - req.query: ",
    JSON.stringify(req.query),
    " - time: ",
    new Date().toISOString()
  );

  let poolAddress = req.query.poolAddress;
  poolAddress = poolAddress?.trim();

  let queryStatus;
  let code;
  let message;
  let data = {};
  let meta = {};

  if (poolAddress === undefined || poolAddress === "") {
    queryStatus = "error";
    code = 400;
    message = "`poolAddress` is a required non-empty query parameter.";
  } else if (poolAddress) {
    poolAddress = removeQuotesFromString(poolAddress);
    queryStatus = "success";
    code = 200;
    message = "The APY for the pool was successfully retrieved.";

    data = {
      apy: "2",
    };
    meta = {
      poolAddress,
    };
  }

  const response = getResponse(queryStatus, code, message, data, meta);
  console.log(
    "GET /apy - response: ",
    JSON.stringify(response),
    " - time: ",
    new Date().toISOString()
  );
  res.status(code).json(response);
});

module.exports = router;
