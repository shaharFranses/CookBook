import React, { Component } from 'react';
import recipeService from '../../services/recipeService'
import { Link } from "react-router-dom";
import '../../styles/search.css'
class Search extends Component {
    state = {
     searchbar:'',
     recipes:[],
    }
 search= async (e)=>{
      let newkeystroke=e.target.value
     
    await this.setState({searchbar:newkeystroke})
    if(this.state.searchbar.length>0){
    const {data}=await recipeService.searchRecipes(this.state.searchbar);
       this.setState({recipes:data})

 }}
    render() { 
        const { recipes } = this.state;
        return (
          
          <form className='mx-2'    onChange={this.search}>
              <div className="active-pink-3 active-pink-4 mb-4">
                  <input className='form-control' id="myInput" type="text" name="recipe" placeholder="search for a recipe"/>
                     <div>

                      {
                          this.state.searchbar.length>0 ?
                            ( recipes.length > 0 ?  recipes.map((recipe) => (
                        
                            <Link style={{color:'black'}}  to={`/recipes/${recipe._id}`}>
                            <div className='searchResult ' key={recipe._id}   ><img style={{width:100,height:48}} src={recipe.recipeImage} 
                            alt=""/> {recipe.recipeName}</div></Link> )) : 
                            <div  className='searchResult' >
                              Sorry,there arent any matches to your search ,how about create your own recipe  <Link to='/create-recipe'> here</Link></div>): null
              }
              </div>
            </div>
            </form>
        
          )
    }
}
 
export default Search;