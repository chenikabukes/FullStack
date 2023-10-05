const express = require("express");
const { ObjectId } = require("mongodb");

// This function will hold all the routing functionality for the database
const databaseRouter = function (collection) {
  const router = express.Router();

  // Function for catching errors, this is to keep the code DRY
  const errorCatcher = function (inputError) {
    console.error(inputError);
    res.status(500);
    res.json({ status: 500, error: inputError });
  };

  // Route for getting all staff data
  router.get("/", (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => errorCatcher(err));
  });

  // Route for getting specific staff data
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    collection
      .findOne({ _id: new ObjectId(id) }) // ObjectID(id) is used to convert the id parameter from a string to a MongoDB ObjectID, which is the expected format for querying documents by their _id.
      .then((doc) => console.log(res.json(doc))) // This part of the code is a promise chain. After the findOne query is executed, it returns a promise. If the query succeeds, it will call the function specified in the then method, passing the retrieved doc (document) as its argument.
      // res.json(doc) sends a JSON response to the client (web browser) containing the data from the retrieved document. In this case, it sends the data of the specific staff member found in the database.
      .catch((err) => errorCatcher(err));
  });

  // Route for deleting specific staff
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectId(id) })
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => errorCatcher(err));
  });

  // Route for creating new staff
  router.post("/", (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then((result) => {
        res.json(result.acknowledged);
      })
      .catch((err) => errorCatcher(err));
  });

  // Route for updating specific staff
  router.put("/:id", (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;

    collection
      .findOneAndUpdate({ _id: ObjectID(itemId) }, { $set: updatedItem })
      .then((result) => {
        res.json(result.value);
      })
      .catch((err) => errorCatcher(err));
  });

  return router;
};

module.exports = databaseRouter;
