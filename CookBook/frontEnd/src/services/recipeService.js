import http from "./httpService";
import { apiUrl } from "../config.json";


//get recipe by id
export function getRecipe(recipeId) {
  return http.get(`${apiUrl}/recipes/${recipeId}`);
}
//get  recipes for home page (infinite scrolling)
export function getRandomRecipes(num) {
  return http.get(`${apiUrl}/recipes/random/${num}`);
}

//edit  a recipe
export function editRecipe(recipe) {
  const recipeId = recipe._id;
  delete recipe._id;
  return http.put(`${apiUrl}/recipes/${recipeId}`, recipe);
}

//get all users recipes
export function getMyRecipes() {
  return http.get(`${apiUrl}/recipes/my-recipes`);
}
//search recipes
export function searchRecipes(searchbar) {
  return http.get(`${apiUrl}/recipes/userbar/${searchbar}`);
}


// create recipes
export function createRecipe(recipe) {
  return http.post(`${apiUrl}/recipes`, recipe);
}

//deleting recipe from db using spesific id 
export function deleteRecipe(recipeId) {
  return http.delete(`${apiUrl}/recipes/${recipeId}`);
}

export default {
  getRecipe,
  editRecipe,
  getMyRecipes,
  createRecipe,
  getRandomRecipes,
  searchRecipes,
  deleteRecipe,
};
