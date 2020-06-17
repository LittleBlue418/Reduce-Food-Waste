import React from 'react'
import classes from './SiteHeader.module.css';


import Banner from '../../components/UI/Banner/Banner';




const SiteHeader = (props) => (
  <header className={classes.SiteHeader}>
      <Banner />
  </header>
);

export default SiteHeader;