const validator = require("../helpers/validate");

const savePokemon = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    number: "required|integer",
    type: "required|array",
    image: "required|string",
    shiny: "required|string",
    height: "required|string",
    weight: "required|string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePokemon,
};