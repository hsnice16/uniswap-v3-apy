const axios = require("axios");
const { UNISWAP_V3_GRAPH_BASE_URL, POOLS_DB } = require("./constants");

async function isEthereumMainnetPool(address) {
  const isPoolExist = POOLS_DB[address];
  if (isPoolExist || isPoolExist === false) {
    return true;
  }

  try {
    const poolQuery = `
    {
      pool(id: "${address}") {
        id
      }
    }
    `;

    const {
      data: {
        data: { pool },
      },
    } = await axios({
      url: UNISWAP_V3_GRAPH_BASE_URL,
      method: "POST",
      data: {
        query: poolQuery,
      },
    });

    if (pool === null || pool?.id !== address) {
      return false;
    }

    return true;
  } catch (error) {
    // keep it close to the code that throws it
    console.error(
      "isEthereumMainnetPool - error: ",
      error,
      " - iso_date_string: ",
      new Date().toISOString()
    );

    throw new Error(error);
  }
}

module.exports = {
  isEthereumMainnetPool,
};
