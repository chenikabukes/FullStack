// const constants = require("./config");

// const weatherData = async (address) => {
//   const url =
//     constants.openWeatherMap.BASE_URL +
//     encodeURIComponent(address) +
//     `&appid=` +
//     constants.openWeatherMap.PRIVATE_KEY;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (response.status !== 200) {
//       throw new Error("Can't fetch the data");
//     }

//     return {
//       temperature: data.main.temp,
//       description: data.weather[0].description,
//       cityName: data.name,
//       humidity: data.main.humidity,
//     };
//   } catch (error) {
//     throw error;
//   }
// };
require("dotenv").config();

const weatherData = async (address) => {
  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
    encodeURIComponent(address) +
    `?key=` +
    PRIVATE_KEY;

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
