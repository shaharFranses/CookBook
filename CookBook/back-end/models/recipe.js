const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const { object, string, any } = require("@hapi/joi");

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  recipeDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  recipeIngredients:  [
    {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 999,
    },
  ],
  recipeTime: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  recipeComplexity: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  numberOfPlates: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  recipeImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  recipeDirections: [
    {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 999,
    },
  ],
  recipeNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

function validateRecipe(recipe) {
  const schema = Joi.object({
    recipeName: Joi.string().min(2).max(255).required(),
    recipeDescription: Joi.string().min(2).max(1024).required(),
    recipeIngredients:Joi.array(),
    recipeTime: Joi.string().min(2).max(255).required(),
    recipeComplexity: Joi.string().min(2).max(255).required(),
    numberOfPlates: Joi.string().min(1).max(255),
    recipeImage: Joi.string().min(11).max(1024),
    recipeDirections: Joi.array(),
  });

  return schema.validate(recipe);
}

async function generateRecipeNumber(recipe) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let recipe = await Recipe.findOne({ recipeNumber: randomNumber });
    if (!recipe) return String(randomNumber);
  }
}

exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
exports.generateRecipeNumber = generateRecipeNumber;
