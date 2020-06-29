import React from 'react';

import siteLogo from '../../../assets/images/site-logo.png'
import classes from './Logo.module.css';

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={siteLogo} alt="Site Logo"/>
  </div>
);

export default Logo;