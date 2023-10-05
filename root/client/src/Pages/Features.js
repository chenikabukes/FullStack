import React, { useState } from "react";

const Features = () => {
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleClick = () => {
    if (city && countryCode) {
      fetch(`http://localhost:4000/weather/${city}/${countryCode}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data); // Debugging line
          setWeatherData(data.weather.temperature);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error("City and countryCode are required");
    }
  };

  return (
    <div>
      <h1>This is features</h1>
      <p>
        City:{" "}
        <input
          type="text"
          value={city}
          id="city"
          onChange={(e) => setCity(e.target.value)}
        />
      </p>
      <p>
        Country Code:{" "}
        <input
          type="text"
          value={countryCode}
          id="countryCode"
          onChange={(e) => setCountryCode(e.target.value)}
        />
      </p>

      <button onClick={handleClick}>Get Weather Data</button>

      {weatherData && (
        <div>
          <h2>Weather Data</h2>
          <p>Temperature: {weatherData}</p>
        </div>
      )}
    </div>
  );
};

export default Features;
