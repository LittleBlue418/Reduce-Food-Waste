import React, { Component } from 'react';
import TipBox from '../../components/UI/TipBox/TipBox';
import Search from '../../components/Search/Search';
import RecipeCards from '../../components/RecipeCards/RecipeCards';
import APIClient from '../../apiClient';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.API = new APIClient();
  }

  state = {
    tipsBoxShown: false,
    searchParams: {
      vegan: false,
      vegetarian: false,
      gluten_free: false,
      nut_free: false,
      egg_free: false,
    },
    recipes: []
  }

  componentDidMount() {
    this.API.list_recipes().then(recipes => {
      this.setState({recipes: recipes})
    })
  }

  toggleTipsBox = () => {
    this.setState((prevState) => {
      return {tipsBoxShown: !prevState.tipsBoxShown}
    })
  }

  addSearchParam = (tag, isChecked) => {
    const searchParams = this.state.searchParams
    searchParams[tag] = isChecked
    this.setState({searchParams: searchParams})
  }



  render() {
    const {tipFunc} = this.props
    const {recipes} = this.state

    return (
      <div>
        <TipBox
          clicked={this.toggleTipsBox}
          tipShown={this.state.tipsBoxShown}
          tipFunc={tipFunc}
        />
        <Search
          searchParams={this.state.searchParams}
          addSearchParam={this.addSearchParam}
        />
        <RecipeCards
          recipes={recipes}
        />
      </div>
    );
  }
}

export default SearchPage;