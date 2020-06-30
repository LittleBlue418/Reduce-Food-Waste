import React from 'react'
import classes from './NavItem.module.css'
import { Link } from "react-router-dom"

const NavItem = ({ link, children, external }) => (
  <li className={classes.NavItem}>
    {external ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link
        to={link}>
        {children}
      </Link>
    )}

  </li>
)

export default NavItem