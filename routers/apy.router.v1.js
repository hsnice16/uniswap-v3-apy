const express = require("express");
const router = express.Router();
const { getResponse, calculateApy } = require("../utils/misc");
const { isEthereumMainnetPool } = require("../utils/is-ethereum-mainnet-pool");
const { getLast24hrsFeeData } = require("../utils/get-last-24hrs-fee-data");

router.route("/").get(async (req, res) => {
  let { poolAddress } = req.query;
  let queryStatus;
  let code;
  let message;

  let data = {};
  let meta = {};

  try {
    const isEthereumPool = await isEthereumMainnetPool(poolAddress);

    if (!isEthereumPool) {
      queryStatus = "error";
      code = 400;
      message = "The pool does not exist in Ethereum mainnet.";
    } else {
      const last24hrsFeeData = await getLast24hrsFeeData(poolAddress);

      if (Object.keys(last24hrsFeeData).length !== 3) {
        queryStatus = "error";
        code = 404;
        message = "The last 24 hours trading fee data is not available.";
      } else {
        const { feesUSD, date, volumeUSD } = last24hrsFeeData;
        const apy = calculateApy(feesUSD, volumeUSD);

        queryStatus = "success";
        code = 200;
        message = "The APY for the pool was successfully retrieved.";

        data = {
          apy_percent: apy,
        };
        meta = {
          poolAddress,
          apy_for_date: new Date(date * 1000).toISOString(),
        };
      }
    }
  } catch (error) {
    queryStatus = "error";
    code = 500;
    message = "Internal server error.";
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
