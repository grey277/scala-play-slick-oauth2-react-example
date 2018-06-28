import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import {Login} from './Login';

class Header extends Component {

  constructor() {
    super()
    this.changeView = this
      .changeView
      .bind(this)
  }

  changeView() {
    this
      .props
      .switchView(0)
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={this.changeView}>
              Shop
            </a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Login
          firstName={this.props.loginData.firstName}
          lastName={this.props.loginData.lastName}
          avatarUrl=
          {this.props.loginData.avatarUrl + "&height=" + this.props.loginData.height + "&width=" + this.props.loginData.width + "&ext=" + this.props.loginData.ext + "&hash=" + this.props.loginData.hash}
          basketData={this.props.basketData}
          switchView={this.props.switchView}/>
      </Navbar>
    );
  }
};
export {Header}