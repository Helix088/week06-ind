const validator = require("../helpers/validate");

const savePokemon = async (req, res, next) => {
  const validationRule = {
    id: "required|string",
    name: "required|string",
    number: "required|integer",
    type: "required|string|array",
    image: "required|string",
    shiny: "required|string",
    height: "required|string",
    weight: "required|string",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};
module.exports = {
  savePokemon,
};
