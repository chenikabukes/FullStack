// Initializes application port
const PORT = process.env.PORT || 4000;

// Initialize express in application
const express = require("express");

// Initialise database
const MongoClient = require("mongodb").MongoClient;

// Initialise middleware routing
const newRouter = require("./routes/router.js");

// our 3rd party apis we want to query
const { weatherData } = require("./utils/weatherData");
// const YodaTranslator = require("./utils/yodaTranslator");

// Loads env variables
require("dotenv").config();

// Creates app
const app = express();

// Adds json parsing middleware
app.use(express.json());

const cors = require("cors");
app.use(cors());

MongoClient.connect("mongodb://localhost:27017") // This is the location of where your local database is living.
  .then((client) => {
    const db = client.db("CodeForGood"); // The name we gave our DB
    const staffCollection = db.collection("staff"); // The name we gave our collection inside the DB
    const staffRouter = newRouter(staffCollection);

    app.use("/getData", staffRouter); // Defining the base route where we can later access our data
  })
  .catch(console.err);

// Connect to external apis here
app.get("/weather/:city/:countryCode", async (req, res) => {
  const city = req.params.city;
  const countryCode = req.params.countryCode;
  console.log(city, countryCode);

  if (!city || !countryCode) {
    return res.status(400).send({
      error: "Please enter a valid city and country code",
    });
  }

  const address = `${city}, ${countryCode}`;

  console.log("address is ", address);

  try {
    // Call the weatherData function and await its response
    const weather = await weatherData(address);
    // Send the weather data as the response
    res.send({
      weather,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
});

app.listen(PORT, function () {
  console.log(`Listening on this port: ${this.address().port}`);
});
