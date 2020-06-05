import React, { Component } from 'react';

import Auxiliary from '../hoc/Auxiliary';
import SiteHeader from '../Navigation/SiteHeader/SiteHeader';
import AuthContext from '../context/AuthContext';

class Layout extends Component {
  render() {
    return (
      <Auxiliary>
        <SiteHeader />
        <AuthContext.Consumer>
          {(constext) => constext.authenticated? <p>Hey! You are logged in!</p> : <p>Please log in</p>}
        </AuthContext.Consumer>


      </Auxiliary>
    );
  }
}

export default Layout;