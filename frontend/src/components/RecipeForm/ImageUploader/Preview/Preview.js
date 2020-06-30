import React from "react"
import classes from './Preview.module.css'

export const Preview = ({ image }) => {
  const style = {}
  if (image !== null) {
    style.backgroundImage = `url(${image})`
  }

  return <div className={classes.Preview} style={style} />
}
