const axios = require("axios");
const { UNISWAP_V3_GRAPH_BASE_URL } = require("./constants");

async function getLast24hrsFeeData(address) {
  try {
    const poolQuery = `
    {
        pool(id: "${address}") {
            poolDayData(where: {feesUSD_gt: "0"}) {
                feesUSD
                date
                volumeUSD
            }
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

    if (pool === null || pool?.poolDayData.length === 0) {
      return {};
    }

    const { poolDayData } = pool;
    const { feesUSD, date, volumeUSD } = poolDayData[0];
    return { feesUSD, date, volumeUSD };
  } catch (error) {
    // keep it close to the code that throws it
    console.error(
      "getLast24hrsFeeData - error: ",
      error,
      " - iso_date_string: ",
      new Date().toISOString()
    );

    throw new Error(error);
  }
}

module.exports = {
  getLast24hrsFeeData,
};
