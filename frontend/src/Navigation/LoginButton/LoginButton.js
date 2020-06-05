import React from 'react';
import classes from './LoginButton.module.css';
import AuthContext from '../../context/AuthContext';


const LoginButton = (props) => (
  <AuthContext.Consumer>
        {(context) => <button
                className={classes.LoginButton}
                onClick={context.login}>
                    {context.authenticated ? <p>My Page</p> : <p>Log In</p>}
            </button>}
  </AuthContext.Consumer>

);

export default LoginButton;