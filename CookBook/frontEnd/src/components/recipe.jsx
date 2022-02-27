import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import userService from '../services/userService'
import '../styles/recipe.css'

  class Recipe extends Component {
    state = {
      color:"white",
      starType: "  far fa-star fa-1x "
    };
      favclick= async()=>{
        try{
      let favID=await userService.favRecipe(this.props.recipe);
      this.setState({ color : "yellow" })
      this.setState({ starType : "  fas fa-star fa-1x " })
      toast("Recipe added to your favorites ")
      return
        }catch(ex){
          if(ex.response && ex.response.status===400){
            toast("Recipe already favored ")
          }
        }
  
   }
 

  render() {
    const {recipe}=this.props
    return(
    <div className="container recipeDiv my-2 textfont">
    <div className="row mb-2">
      <div className="col-lg-1 col-md-2 col-sm-2 ">
        <img  className="userimg mt-3" src={recipe.user_id.userImage} />
      </div>
      <div className="col-lg-9 col-md-9 col-sm-8">
        <h2 className="mt-3">
          {recipe.user_id.name}'s {recipe.recipeName}
        </h2>
      </div>
      <div className="col-lg-1 col-md-2 col-sm-2 d-flex justify-content-end ">
        
      </div>
    </div>

    <div className="row">
      <div className="col-lg-4 col-sm-12">
        <p  className='line'>Time :<span className='subline'> {recipe.recipeTime}</span></p>
        <p className='line'>Complexity :<span className='subline'> {recipe.recipeComplexity}</span></p>
        <p className='line'>Number of plates :<span className='subline'>{recipe.numberOfPlates}</span> </p>
    <p className='line'>Description :<span className='subline'> {recipe.recipeDescription}</span></p>
      </div>
      <div className="col-lg-4 col-sm-12">
        <h3 className='line'>Ingrediants</h3>
        <ul>
          {recipe.recipeIngredients.map((ingridient, index) => (
            <li key={index}>{ingridient}</li>
          ))}
        </ul>
      </div>
      <div className="col-lg-4 col-sm-12">
        <img
          className="dishimg mr-auto my-2"
          src={recipe.recipeImage}
          alt={recipe.recipeName}
        />
      </div>
    </div>
    <div className="row justify-content-center">
      <Link to={`/recipes/${recipe._id}`}>
        <button  className="orangeButton mb-2 ">Lets cook ! </button>
      </Link>
      <span>
          <button className='orangeButton mb-2 mx-2' onClick={this.favclick}  style={{color:this.state.color}} >
          <i className=  {this.state.starType}   style={{color:this.state.color}}></i>
          </button>
        </span>
    </div>
  </div>
    )}}

export default Recipe;
