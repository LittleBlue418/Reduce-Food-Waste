import React, { Component } from 'react';

import Auxiliary from '../hoc/Auxiliary';
import SiteHeader from '../Navigation/SiteHeader/SiteHeader';

class Layout extends Component {
  render() {
    return (
      <Auxiliary>
        <SiteHeader />

      </Auxiliary>
    );
  }
}

export default Layout;