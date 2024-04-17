const axios = require("axios");

async function checkIfPoolExists(address) {
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
      url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
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
    console.log(
      "checkIfPoolExists - error: ",
      error,
      " - iso_date_string: ",
      new Date().toISOString()
    );

    throw new Error(error);
  }
}

module.exports = {
  checkIfPoolExists,
};
