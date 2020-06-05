import React, { Component } from 'react';
import './App.css';

import SiteHeader from '../Navigation/SiteHeader/SiteHeader'
import RecipeCards from '../components/RecipeCards/RecipeCards'
import Layout from '../Layout/Layout';


class App extends Component {

  recipes = [
    { id: 'sbv7a', name: 'test recipe 1', ingredients: ['sausages', 'carrots'] },
    { id: 'sbv7a', name: 'test recipe 2', ingredients: ['sausages', 'carrots'] },
    { id: 'sbv7a', name: 'test recipe 3', ingredients: ['sausages', 'carrots'] },
  ]

  render() {
      return(
        <div className = "App" >
          <Layout />
          <h1>This app is running</h1>
          <RecipeCards />
        </div>
      );
  }

}

export default App;
