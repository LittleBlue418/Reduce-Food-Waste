import React from 'react';
import classes from './Banner.module.css';
import Logo from '../Logo/Logo';

const Banner = (props) => (
  <div className={classes.Banner}>
    <div className={classes.Logo}>
       <Logo />
    </div>
    <div className={classes.BannerText}>Reduce Food Waste</div>
  </div>
);

export default Banner;