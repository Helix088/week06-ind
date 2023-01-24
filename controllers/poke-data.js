const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getPokeData = (req, res) => {
  mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const getPokemon = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Pokemon id to find Pokemon.");
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
    });
};

const createPokemon = async (req, res) => {
  const pokemon = {
    name: req.body.name,
    number: req.body.number,
    type: req.body.type,
    image: req.body.image,
    shiny: req.body.shiny,
    height: req.body.height,
    weight: req.body.weight,
  };
  const response = await mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .insertOne(pokemon);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the Pokemon."
      );
  }
};

const updatePokemon = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Pokemon id to update Pokemon.");
  }
  const userId = new ObjectId(req.params.id);
  const pokemon = {
    name: req.body.name,
    number: req.body.number,
    type: req.body.type,
    image: req.body.image,
    shiny: req.body.shiny,
    height: req.body.height,
    weight: req.body.weight,
  };
  const response = await mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .replaceOne({ _id: userId }, pokemon);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the Pokemon"
      );
  }
};

const deletePokemon = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Pokemon id to delete Pokemon.");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the Pokemon."
      );
  }
};

module.exports = {
  getPokeData,
  getPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
