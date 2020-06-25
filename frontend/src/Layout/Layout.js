import React, { useState } from 'react';

import Auxiliary from '../hoc/Auxiliary';
import SiteHeader from '../Navigation/SiteHeader/SiteHeader';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


const Layout = () => {
  const [sidedrawerShown, setSidedrawerShown] = useState (false)

  const toggleSidedrawer = () => {
    const currentState = sidedrawerShown
    const newState = !currentState
    setSidedrawerShown(newState)
  }

    return (
      <Auxiliary>

        <SiteHeader
          toggleSidedrawer={toggleSidedrawer}
        />

        <SideDrawer
          toggleSidedrawer={toggleSidedrawer}
          sidedrawerShown={sidedrawerShown}
        />

      </Auxiliary>

    );

}

export default Layout;