// Lets use some of the packages we've installed
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const newRouter = require("./router.js");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

MongoClient.connect("mongodb://localhost:27017") // This is the location of where your local database is living.
  .then((client) => {
    const db = client.db("CodeForGood"); // The name we gave our DB
    const staffCollection = db.collection("staff"); // The name we gave our collection inside the DB
    const staffRouter = newRouter(staffCollection);

    app.use("/getData", staffRouter); // Defining the base route where we can later access our data
  })
  .catch(console.err);

app.listen(PORT, function () {
  console.log(`Listening on this port: ${this.address().port}`);
});
