import React from 'react';
import classes from './LoginButton.module.css';

const LoginButton = (props) => (
  <button className={classes.LoginButton}>{props.children}</button>
);

export default LoginButton;