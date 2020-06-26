import React from 'react'
import classes from './SiteHeader.module.css';

import Banner from '../../components/UI/Banner/Banner';
import MenuIcon from '@material-ui/icons/Menu';


const SiteHeader = ({toggleSidedrawer}) => (
  <header className={classes.SiteHeader}>
      <div className={classes.ButtonDiv} onClick={toggleSidedrawer}>
          <MenuIcon style={{color: 'white'}}/>
      </div>
      <Banner />
  </header>
);

export default SiteHeader;