import React, { Component } from 'react';
import './App.css';

import RecipeCards from '../components/RecipeCards/RecipeCards'
import Layout from '../Layout/Layout';
import AuthContext from '../context/AuthContext';


class App extends Component {
  state = {
    authenticated: false,
  }

  recipes = [
    { id: 'sbv7a', name: 'test recipe 1', ingredients: ['sausages', 'carrots'] },
    { id: 'sbv7a', name: 'test recipe 2', ingredients: ['sausages', 'carrots'] },
    { id: 'sbv7a', name: 'test recipe 3', ingredients: ['sausages', 'carrots'] },
  ]

  loginHandler = () => {
    this.setState({ authenticated: true})
    console.log('hey')
  }

  render() {
      return(
        <div className = "App" >
          <AuthContext.Provider
            value={{
              authenticated: this.state.authenticated,
              login: this.loginHandler
            }}>
              <Layout />
              <h1>This app is running</h1>
              <RecipeCards />
          </AuthContext.Provider>

        </div>
      );
  }

}

export default App;
