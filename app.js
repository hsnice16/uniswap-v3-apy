const express = require("express");
const apyV1 = require("./routers/apy.router.v1");
const poolV1 = require("./routers/pool.router.v1");
const { parseAddress } = require("./middlewares/parse-address.middleware");
const app = express();

const port = 3000;

app.use(express.json());
app.use("/v1/apy", parseAddress, apyV1);
app.use("/v1/pool", parseAddress, poolV1);

app.listen(port, () => {
  console.log(`Express app listening on port: ${port}`);
});
