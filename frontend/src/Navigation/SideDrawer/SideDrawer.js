import React from 'react';

import classes from './SideDrawer.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Auxiliary from '../../hoc/Auxiliary';
import Logo from '../../components/UI/Logo/Logo';
import NavItems from './NavItems/NavItems';


const SideDrawer = ({clicked, sidedrawerShown}) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (sidedrawerShown === true) {
    attachedClasses = [classes.SideDrawer, classes.Open];
    console.log('here')
  }

  return (
    <Auxiliary>
      <Backdrop
        show={sidedrawerShown}
        clicked={clicked}
        className={classes.SDBackdrop}
      />

      <div className={attachedClasses.join(' ')}>

        <div className={classes.MenuLogo}>
            <Logo />
        </div>

        <nav>
          <NavItems />
        </nav>

      </div>
    </Auxiliary>

  );
};

export default SideDrawer;