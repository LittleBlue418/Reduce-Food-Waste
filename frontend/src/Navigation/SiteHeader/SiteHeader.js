import React from 'react'
import classes from './SiteHeader.module.css';


import Banner from '../../components/UI/Banner/Banner';
import LoginButton from '../LoginButton/LoginButton';



const SiteHeader = (props) => (
  <header className={classes.SiteHeader}>

      <Banner />

      <LoginButton>Log In</LoginButton>

  </header>
);

export default SiteHeader;