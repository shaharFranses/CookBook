import React, { Component } from 'react'
import recipeService from '../services/recipeService'
import Pageheader from '../components/common/pageHeader'


class Fullrecipe extends Component {
    state = {
      data:{
  recipeName: '',
  recipeDescription: '',
  recipeIngredients: [],
  recipeTime: '',
  recipeComplexity: '',
  numberOFplates: '',
  recipeImage: '',
  recipeDirections:[],
  user_id:{
    name:'',
    userImage:''
  }
},
errors: {}
    }
    async componentDidMount(){
      const recipeId=this.props.match.params.id
      const {data}= await recipeService.getRecipe(recipeId)
      this.setState({data:this.mapToViewModel(data)})
    }
    mapToViewModel(recipe) {
      return {
        _id: recipe._id,
        recipeName: recipe.recipeName,
        recipeDescription: recipe.recipeDescription,
        recipeIngredients: recipe.recipeIngredients,
        recipeTime: recipe.recipeTime,
        recipeComplexity: recipe.recipeComplexity,
        numberOfPlates: recipe.numberOfPlates,
        recipeImage: recipe.recipeImage,
        recipeDirections:recipe.recipeDirections,
        user_id:{
          name:recipe.user_id.name,
          userImage:recipe.user_id.userImage
        }
    };}
    render() {
 const {data}=this.state
     
        return (
         
<div className='container recipeDiv textfont '>

<Pageheader titleText={data.recipeName} ></Pageheader>
        <div className='container my-2 text-center'>{data.recipeDescription}</div>
<div className="row">
            <div className="col-lg-4 col-sm-12">
            <p  className='line'>Time : <span className='subline'> {data.recipeTime}</span></p>
        <p className='line'>Complexity : <span className='subline'> {data.recipeComplexity}</span></p>
        <p className='line'>Number of plates : <span className='subline'>{data.numberOfPlates}</span> </p>
            </div>
            <div className="col-lg-4 col-sm-12">
            <h3 className='line'>Ingrediants</h3>
              <ul>
                {data.recipeIngredients.map((ingridient, index) => (
                  <li key={index}>{ingridient}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-4 col-sm-12">
              <img
                className="dishimg mr-auto my-2"
                src={data.recipeImage}
                alt={data.recipeName}
              />
            </div>
          </div>
          <div className='container'>

          </div>
 {data.recipeDirections.map((direction, index) => (
                  <p key={index}><span className='line'>{index+1}</span>. {direction}</p>
                ))}


</div> 

       
        );
      
    }
  }
  
  export default Fullrecipe;