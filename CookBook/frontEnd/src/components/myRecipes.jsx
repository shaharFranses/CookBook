import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import recipeService from "../services/recipeService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import '../styles/myRecipes.css'

class MyRecipes extends Component {
  state = {
    recipes: [],
  };

  async componentDidMount() {
    const { data } = await recipeService.getMyRecipes()
    if (data.length > 0) this.setState({ recipes: data });
  }

  deleteRecipe= async(recipeid)=>{

     let recipeId=await recipeService.deleteRecipe(recipeid);
     toast('the recipe is deleted !')
     const { data } = await recipeService.getMyRecipes()
     if (data.length > 0) this.setState({ recipes: data });

}

  render() {
    const { recipes } = this.state;

    return (
      <div className="container">
        <PageHeader titleText="My recipes Page" />
        <div className="row">
          <div className="col-12">
          <div className="container text-center my-2">
          <p ><Link to='/create-recipe' className='yellowButton'> I Want to Create my own recipe !</Link></p>
          </div>

          </div>
        </div>
        <div className="row justify-content-center">

        {(recipes.length>0)?(
          recipes.length > 0 &&
            recipes.map((recipe) => (
             <div   key={recipe._id} className="  recipeCard card text-white col-lg-3 col-md-4 col-sm-12 cardRecipe mx-2 my-2">
        <img
          className=" cardImage card-img-top my-2"
          src={recipe.recipeImage}
          alt={recipe.recipeName}
        />
        <div className="card-body text-center">
          <h3 className="card-text text-center">{recipe.recipeName}</h3>
          <p className="">
            <Link to={`/recipes/${recipe._id}`}>
              <button className="btn btn-primary">
                <i className="fas fa-hamburger"></i>
              </button>
            </Link>
     
            <Link to={`/my-recipes/edit/${recipe._id}`}>
            <button className="btn btn-light mx-1">
              <i className="fas fa-pen"></i>
           
            </button>
            </Link >
            
            <button className="btn btn-danger" onClick={()=>this.deleteRecipe(recipe._id)}>
              <i className="fas fa-trash"></i>
            </button>
            
          </p>
        </div>
      </div>
              
              ))):(<div className='textfont'> No recipes,try to create some using the button above </div>)}
        </div>
      </div>
    );
  }
}

export default MyRecipes;
