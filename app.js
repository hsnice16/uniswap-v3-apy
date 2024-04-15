const express = require("express");
const apyV1 = require("./routers/apy.router.v1");
const poolV1 = require("./routers/pool.router.v1");
const app = express();

const port = 3000;

app.use(express.json());
app.use("/v1/apy", apyV1);
app.use("/v1/pool", poolV1);

app.listen(port, () => {
  console.log(`Express app listening on port: ${port}`);
});
