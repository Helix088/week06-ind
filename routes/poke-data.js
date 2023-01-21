const express = require("express");
const routes = express.Router();

const pokeDataControl = require("../controllers/poke-data");
const validation = require('../middleware/validate');

routes.get("/", pokeDataControl.getPokeData);

routes.get("/:id", pokeDataControl.getPokemon);

routes.post("/", validation.savePokemon, pokeDataControl.createPokemon);

routes.put("/:id", validation.savePokemon, pokeDataControl.updatePokemon);

routes.delete("/:id", pokeDataControl.deletePokemon);

module.exports = routes;
