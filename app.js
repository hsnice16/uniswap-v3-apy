const express = require("express");
var cors = require("cors");

const apyV1 = require("./routers/apy.router.v1");
const poolV1 = require("./routers/pool.router.v1");
const { parseAddress } = require("./middlewares/parse-address.middleware");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/v1/apy", parseAddress, apyV1);
app.use("/v1/pool", parseAddress, poolV1);

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Welcome to the Uniswap V3 Apy API",
  });
});

app.listen(port, () => {
  console.log(`Express app listening on port: ${port}`);
});
