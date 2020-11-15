const express = require("express");
const _ = require("lodash");
const {
  Recipe,
  validateRecipe,
  generateRecipeNumber,
} = require("../models/recipe");
const auth = require("../middleware/auth");
const router = express.Router();


 //fetch users recipe list
router.get("/my-recipes", auth, async (req, res) => {
  const recipes = await Recipe.find({ user_id: req.user._id }).populate('user_id','name userImage')
  res.send(recipes);
});

//fetch recipes from db  for home page
router.get("/random/:num", auth, async (req, res) => {
  let sentnum= req.params.num
  let newnum= parseInt(sentnum,10)
  const recipes = await Recipe.find().sort({ _id: -1 }).limit(newnum).populate('user_id','name userImage')
  
  res.send(recipes);
});

//fetch recipes that match the user search query  from db  
router.get('/userbar/:recipeName',auth, async (req,res)=>{
  let recipeName=req.params.recipeName;
  const recipes = await Recipe.find({recipeName: new RegExp(req.params.recipeName)})
 
   res.send(recipes)

} )

//delete user recipe
router.delete("/:id", auth, async (req, res) => {
  const recipe = await Recipe.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!recipe)
    return res.status(404).send("The recipe with the given ID was not found.");
  res.send(recipe);
});

//edit recipe
router.put("/:id", auth, async (req, res) => {
  const { error } = validateRecipe(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let recipe = await Recipe.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!recipe)
    return res.status(404).send("The recipe with the given ID was not found.");

  recipe = await Recipe.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(recipe);
});

//get a spesific recipe
router.get('/:id',auth, async (req,res)=>{
  const recipe = await Recipe.findById({
    _id: req.params.id,
    user_id: req.user._id,}).populate('user_id','name userImage')
    if (!recipe)
    return res.status(404).send("The recipe with the given ID was not found.");
  res.send(recipe);
  })

//create new recipe
router.post("/", auth, async (req, res) => {
  const { error } = validateRecipe(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let recipe = new Recipe({
    recipeName: req.body.recipeName,
    recipeDescription: req.body.recipeDescription,
    recipeIngredients: req.body.recipeIngredients,
    recipeTime: req.body.recipeTime,
    recipeComplexity: req.body.recipeComplexity,
    numberOfPlates: req.body.numberOfPlates,
    recipeDirections: req.body.recipeDirections,

    recipeImage: req.body.recipeImage
      ? req.body.recipeImage
      : "https://images.unsplash.com/photo-1556694795-b6423d3d5b28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    recipeNumber: await generateRecipeNumber(Recipe),
    user_id: req.user._id,
  });

  post = await recipe.save();
  res.send(post);
});

module.exports = router;
