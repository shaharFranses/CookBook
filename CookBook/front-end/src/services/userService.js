import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";


//get token in order to continue using site
export function getJwt() {
  return localStorage.getItem(tokenKey);
};


//log out from site,removing token from the user browser
export function logout() {
  localStorage.removeItem(tokenKey);
};


//adding recipe to user favorite list
export function favRecipe(recipe){
  const recipeId = recipe._id;
  return http.put(`${apiUrl}/users/favorites/${recipeId}`,recipe)
   
};


//deleting recipe from user favorite list
export function unFavRecipe(recipeid){
  const recipeId=recipeid
  return http.delete(`${apiUrl}/users/favorites/${recipeId}`)
   
};
//get user by id  
export function getUser(userId) {
  return http.get(`${apiUrl}/users/${userId}`);
}

//get user favortie recipes list 
export function myFavoriteRecipes(){
  return http.get(`${apiUrl}/users/my-favorites`);
};



//get current user in order to open navbar links
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}


//login to site
export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
  favRecipe,
  myFavoriteRecipes,
  unFavRecipe,
};
