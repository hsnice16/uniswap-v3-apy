const express = require("express");
const router = express.Router();
const { getResponse } = require("../utils/misc");

router.route("/").get((req, res) => {
  let { poolAddress } = req.query;
  let queryStatus;
  let code;
  let message;

  let data = {};
  let meta = {};

  {
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
    "GET /v1/apy - response: ",
    JSON.stringify(response),
    " - iso_date_string: ",
    new Date().toISOString()
  );

  res.status(code).json(response);
});

module.exports = router;
