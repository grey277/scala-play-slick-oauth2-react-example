import React, {Component} from 'react';
import {NavItem} from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <NavItem eventKey={2} href="/account">
        Account
      </NavItem>
    );
  }
};

export default Login;