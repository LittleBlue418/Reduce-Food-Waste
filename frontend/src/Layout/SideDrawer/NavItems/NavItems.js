import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';


const NavItems = () => {
  return (
    <ul className={classes.NavItems}>
    <NavItem
      link="/">
        Search
    </NavItem>
    <NavItem
      link="/addRecipe">
        Add Recipe
    </NavItem>
    <NavItem
      link="/aboutThisSite">
        About This Site
    </NavItem>
    <NavItem
      link="https://github.com/LittleBlue418"
      external>
        Developer page
    </NavItem>
  </ul>
  );
};

export default NavItems;