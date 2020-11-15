import React, { Component } from "react";
import recipeService from "../services/recipeService";
import Recipe from "./recipe";
import Search from '../../src/components/common/search'
import InfiniteScroll from 'react-infinite-scroll-component';
class Home extends Component {
  state = {
    recipes: [],
 
  };

  async componentDidMount() {
    let recipesLength=this.state.recipes.length
    const { data } = await recipeService.getRandomRecipes(5);
    if (data.length > 0) this.setState({ recipes: data }); 
  }

  render() {
    const { recipes } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
      <div className="container">
      <div className='row'>
        <section className='textfont mx-5  '>
          <h2 className='pt-4' style={{fontSize:35+'px',fontFamily:'Courgette,cursive'}}>hey !</h2>
          Welcome to Cookbook !
          <br/>
          In our web app you can look for a great new recipe to make in your own kitchen.  You can also  add some of your own special recipes and share them with all our users !
          <br/>
          Moreover, you can use the search bar to look for a certain recipe and make your own favorie recipes list
          <br/>
          enjoy !
          <br/>
      
        </section>
      </div>
       <br/>
       
        <Search></Search>
        <div className="row">
          <div className="col-12">
          <InfiniteScroll
          dataLength={this.state.recipes.length}
          //lazy loading,fetching more recipes to home page before user get to the end of the page 
          next={ async ()=>{ 
               let recipesLength=this.state.recipes.length
            const { data } = await recipeService.getRandomRecipes(recipesLength+2);
            if (data.length > 0) this.setState({ recipes: data }); 
          }}
          hasMore={true}
        >
  
            {recipes.length > 0 &&
              recipes.map((recipe) => (
                <Recipe key={recipe._id} recipe={recipe} />
              ))}
                  </InfiniteScroll>
          </div>
        </div>
      </div >
      </React.Fragment>
    );
  }
}

export default Home;
