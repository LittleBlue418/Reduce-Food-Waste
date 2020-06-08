import React, { Component } from 'react';
import TipBox from '../../components/UI/TipBox/TipBox';

class SearchPage extends Component {
  state = {
    tipsBoxShown: false
  }

  toggleTipsBox = () => {
    this.setState((prevState) => {
      return {tipsBoxShown: !prevState.tipsBoxShown}
    })
  }

  render() {
    const {tipFunc} = this.props

    return (
      <div>
        <TipBox
          clicked={this.toggleTipsBox}
          tipShown={this.state.tipsBoxShown}
          tipFunc={tipFunc}
        />
      </div>
    );
  }
}

export default SearchPage;