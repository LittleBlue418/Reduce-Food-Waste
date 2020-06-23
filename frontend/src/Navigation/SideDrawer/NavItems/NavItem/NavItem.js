import React from 'react'
import classes from './NavItem.module.css';

const NavItem = (props) => (
  <li className={classes.NavItem}>
    <a
      href={props.link}
      target={props.target}
      className={props.active ? classes.active : null}>
        {props.children}
    </a>
  </li>
);

export default NavItem;