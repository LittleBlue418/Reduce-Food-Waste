import React from 'react'
import classes from './Banner.module.css'
import Logo from '../Logo/Logo'
import { Link } from "react-router-dom"



const Banner = () => (
  <div className={classes.Banner}>

    <Link to="/">
      <div className={classes.LogoContainer}>
        <Logo />
      </div>
    </Link>

    <Link to="/">
      <div className={classes.SiteBanner}>
        <div className={classes.BannerText}>
          <p>
            Reduce Food Waste
          </p>

        </div>
      </div>
    </Link>

  </div>
)

export default Banner