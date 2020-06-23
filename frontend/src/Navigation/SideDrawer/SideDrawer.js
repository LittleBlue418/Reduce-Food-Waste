import React from 'react';
// import Logo from '../../assets/images/icon.png'
// import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Auxiliary from '../../hoc/Auxiliary';


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
        <nav>

        </nav>
      </div>
    </Auxiliary>

  );
};

export default SideDrawer;