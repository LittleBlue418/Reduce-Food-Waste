import React from 'react';
import classes from './LoginButton.module.css';
import AuthContext from '../../context/AuthContext';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


const LoginButton = (props) => (
  <Router>
    <AuthContext.Consumer>
          {(context) => {
            if (context.authenticated) {
              return (
                <button
                  className={classes.LoginButton}
                >
                  <Link to="/myPage">My Page</Link>
                </button>
              )
            } else {
              return (
                <button
                  className={classes.LoginButton}
                  onClick={context.login}
                >
                  <Link to="/logIn">Log In</Link>
                </button>
              )
            }
          }}
    </AuthContext.Consumer>
  </Router>
);

export default LoginButton;