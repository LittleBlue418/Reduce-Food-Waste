import React from 'react';

import classes from './SideDrawer.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Logo from '../../components/UI/Logo/Logo';
import NavItems from './NavItems/NavItems';


const SideDrawer = ({ toggleSidedrawer, sidedrawerShown }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (sidedrawerShown === true) {
    attachedClasses = [classes.SideDrawer, classes.Open];
    console.log('here')
  }

  return (
    <>
      <Backdrop
        show={sidedrawerShown}
        clicked={toggleSidedrawer}
        className={classes.SDBackdrop}
      />

      <div className={attachedClasses.join(' ')}>

          <div
            className={classes.MenuLogo}
            onClick={toggleSidedrawer}
          >
            <Logo />
          </div>



        <nav onClick={toggleSidedrawer}>
          <NavItems />
        </nav>

      </div>
    </>

  );
};

export default SideDrawer;