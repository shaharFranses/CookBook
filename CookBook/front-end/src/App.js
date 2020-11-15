import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import myfavorties from "./components/myFavorites";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import CreateRecipe from "./components/createRecipe";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoute";
import myRecipes from "./components/myRecipes";
import editRecipe from "./components/editRecipe";
import EditRecipe from "./components/editRecipe";
import fullRecipe from "./components/fullRecipe"
class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: 900 }}>
          <Switch>
            <ProtectedRoute
              path="/my-recipes/edit/:id"
              component={EditRecipe}
            />
            <ProtectedRoute path="/my-recipes" component={myRecipes} />
            <ProtectedRoute
              path="/create-recipe"
              component={CreateRecipe}
            />
            <ProtectedRoute path="/recipes/:id" component={fullRecipe} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <ProtectedRoute path="/myfavorties" component={myfavorties} />
            <ProtectedRoute path="/" user={user} exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
