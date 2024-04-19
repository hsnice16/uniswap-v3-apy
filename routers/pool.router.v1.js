const express = require("express");
const router = express.Router();
const { getResponse } = require("../utils/misc");
const { isEthereumMainnetPool } = require("../utils/is-ethereum-mainnet-pool");
const { POOLS_DB } = require("../utils/constants");

router
  .route("/")
  .post(async (req, res) => {
    let { address } = req.body;
    let queryStatus;
    let code;
    let message;

    let data = {};
    let meta = {};
    const isPoolExist = POOLS_DB[address];

    if (isPoolExist) {
      queryStatus = "error";
      code = 409;
      message = "The pool already exists.";
    } else {
      try {
        const isEthereumPool = await isEthereumMainnetPool(address);

        if (!isEthereumPool) {
          queryStatus = "error";
          code = 400;
          message = "The pool does not exist in Ethereum mainnet.";
        } else {
          POOLS_DB[address] = true;
          queryStatus = "success";
          code = 201;
          message = "The pool was successfully added.";
          meta = {
            address,
          };
        }
      } catch (error) {
        queryStatus = "error";
        code = 500;
        message = "Internal server error.";
      }
    }

    const response = getResponse(queryStatus, code, message, data, meta);
    console.log(
      "POST /v1/pool - response: ",
      JSON.stringify(response),
      " - iso_date_string: ",
      new Date().toISOString()
    );

    res.status(code).json(response);
  })
  .delete((req, res) => {
    let { address } = req.body;
    let queryStatus;
    let code;
    let message;

    let data = {};
    let meta = {};
    const isPoolExist = POOLS_DB[address];

    if (isPoolExist) {
      POOLS_DB[address] = false;
      queryStatus = "success";
      code = 200;
      message = "The pool was successfully removed.";
      meta = {
        address,
      };
    } else {
      queryStatus = "error";
      code = 404;
      message = "The pool does not exist.";
    }

    const response = getResponse(queryStatus, code, message, data, meta);
    console.log(
      "DELETE /v1/pool - response: ",
      JSON.stringify(response),
      " - iso_date_string: ",
      new Date().toISOString()
    );

    res.status(code).json(response);
  });

module.exports = router;
