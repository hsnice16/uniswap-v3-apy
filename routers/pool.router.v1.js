const express = require("express");
const router = express.Router();
const { getResponse, removeQuotesFromString } = require("../utils/misc");

router
  .route("/")
  .post((req, res) => {
    console.log(
      "POST /pool - req.body: ",
      JSON.stringify(req.body),
      " - time: ",
      new Date().toISOString()
    );

    let { address } = req.body;
    address = address?.trim();

    let queryStatus;
    let code;
    let message;
    let data = {};
    let meta = {};

    if (address === undefined || address === "") {
      queryStatus = "error";
      code = 400;
      message = "`address` must be a non-empty field in the request body.";
    } else {
      address = removeQuotesFromString(address);
      const isPoolExists = false;

      if (isPoolExists) {
        queryStatus = "error";
        code = 400;
        message = "The pool does not exist in Ethereum mainnet.";
      } else {
        queryStatus = "success";
        code = 201;
        message = "The pool was successfully added.";
        meta = {
          address,
        };
      }
    }

    const response = getResponse(queryStatus, code, message, data, meta);
    console.log(
      "POST /pool - response: ",
      JSON.stringify(response),
      " - time: ",
      new Date().toISOString()
    );
    res.status(code).json(response);
  })
  .delete((req, res) => {});

module.exports = router;
