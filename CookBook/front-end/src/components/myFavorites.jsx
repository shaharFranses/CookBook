import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";
import userService from '../services/userService'
import { toast } from "react-toastify";
import '../styles/favoriteRecipes.css'
class Myfavorties extends Component {
  state = {
    recipes: [],
  };

 //Get user's favorite recipes and updates recipes state
  async componentDidMount() {
    const { data } = await userService.myFavoriteRecipes()
    console.log(data.favoritesRecipes)
    const {favoritesRecipes}=data
     this.setState({ recipes: favoritesRecipes});
  }

  //when clicked a recipe is deleted from user favortie list
    unFavClick= async(recipeid)=>{
       let favID=await userService.unFavRecipe(recipeid);
       toast('the recipe is gone form your favorite list !')
       const { data } = await userService.myFavoriteRecipes()
       console.log(data.favoritesRecipes)
       const {favoritesRecipes}=data
       this.setState({ recipes: favoritesRecipes});

  }

  render() {
    const { recipes } = this.state;

    return (
      <div className="container ">
        <PageHeader titleText="My favoirtes Page" />
        
          <div className="col-12">
          </div>
      
        <div className="row justify-content-center">
          {(recipes.length>0)?
          
          recipes.length > 0 &&
            recipes.map((recipe ) => (      
             <div  key={recipe._id} className="favCard card text-white col-xl-3 col-lg-3 col-md-3 col-sm-12 cardRecipe mx-4 my-2 " >
        <img
          className=" cardImage card-img-top my-2 mx-auto"
          
          src={recipe.recipeImage}
          alt={recipe.recipeName}
        />
        <div className="card-body text-center">
          <h3 className="card-text text-center">{recipe.recipeName}</h3>
          <p className="">
            <Link to={`/recipes/${recipe._id}`}>
              <button className="btn btn-primary">
                <i className="fas fa-hamburger"></i>
              </button>{" "}
            </Link>
     
            
            <button className="btn btn-danger" onClick={()=>this.unFavClick(recipe._id)}>
              <i className="fas fa-trash"></i>
            </button>{" "}
         
          </p>
        </div>
      </div>
              
            )):(<div className='textfont'> no favorite recipes yet , go and find some in our <Link to='/'>Home page</Link></div>)
          
          }
        </div>
      </div>
    );
  }
}

export default Myfavorties;
