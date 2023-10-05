require("dotenv").config();

const weatherData = async (address) => {
  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
    encodeURIComponent(address) +
    `?key=` +
    process.env.PRIVATE_KEY;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error("Can't fetch the data");
    }

    return {
      temperature: data.currentConditions.temp,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { weatherData };
