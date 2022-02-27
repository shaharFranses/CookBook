const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateRecipes } = require("../models/user");
const auth = require("../middleware/auth");
const { Recipe } = require("../models/recipe");
const { find } = require("lodash");
const router = express.Router();

//fetch the recipes that the user created  from DB
const getRecipes = async (recipesArray) => {
  const recipes = await Recipe.find({ recipeNumber: { $in: recipesArray } });
  return recipes;
};

//fetch the recipes that the user addedto his favorite recipes list   from DB
router.get('/my-favorites',auth, async (req,res)=>{
  const user = await User.findById(req.user._id,"favoritesRecipes")
   res.send(user)
  

} )

// router.get("/recipes", auth, async (req, res) => {
//   if (!req.query.numbers) res.status(400).send("Missing numbers data");

//   let data = {};
//   data.recipes = req.query.numbers.split(",");

//   const recipes = await getRecipes(data.recipes);
//   res.send(recipes);
// });

// router.patch("/recipes", auth, async (req, res) => {
//   const { error } = validateRecipes(req.body);
//   if (error) res.status(400).send(error.details[0].message);

//   const recipes = await getRecipes(req.body.recipes);
//   if (recipes.length != req.body.recipes.length)
//     res.status(400).send("Recipe numbers don't match");

//   let user = await User.findById(req.user._id);
//   user.recipes = req.body.recipes;
//   user = await user.save();
//   res.send(user);
// });


// for testing ,user get is own details (users won't be able to use this)
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//add new recipe to the users favorite recipe list
router.put("/favorites/:id", auth,async (req,res)=>{
 const newfav = await Recipe.findById(req.params.id)
 const check = await User.findById(req.user._id).findOne({"favoritesRecipes":newfav})
  if (check) return res.status(400).send('Recipe already in  favorite');
 const auser = await User.findByIdAndUpdate(req.user._id,{"$push":{"favoritesRecipes":newfav}})
 res.send(newfav)
})

//delete recipes from users favorite list
router.delete("/favorites/:id", auth , async (req,res)=>{
  const newfav = await Recipe.findById(req.params.id)
  const user= await User.findByIdAndUpdate(req.user._id,{"$pull":{"favoritesRecipes":newfav}})
  res.send(user)
})


//signs up new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, [
      "name",
      "email",
      "password",
      "userImage",

      "favortieRecipes",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
