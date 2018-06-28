import React, {Component} from 'react';
import {NavItem, Nav, Image, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';

class Login extends Component {

    constructor() {
    super()
    this.changeView = this
      .changeView
      .bind(this)
  }

  changeView(stateID) {
    this
      .props
      .switchView(stateID)
  }

  render() {
    if (!this.props.firstName) {
      return (
        <Navbar.Collapse>
          <Navbar.Text>
          Login using <Navbar.Link href="http://localhost:9000/authenticate/facebook">facebook</Navbar.Link>
          </Navbar.Text>
        </Navbar.Collapse >

      );
    } else {
      return (
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={1} title="Add" id="basic-nav-dropdown">
              <MenuItem eventKey={1.1} onClick={this.changeView.bind(this, 2)}>Category</MenuItem>
              <MenuItem eventKey={1.2} onClick={this.changeView.bind(this, 3)}>Product</MenuItem>
            </NavDropdown>
          </Nav>
          <Navbar.Text>
            {this.props.firstName.substring(5, this.props.firstName.length - 1)} {this.props.lastName.substring(5, this.props.lastName.length - 1)}
          </Navbar.Text>
          <NavItem>
            <Image
              src={this
              .props
              .avatarUrl
              .substring(5, this.props.avatarUrl.length - 1)}
              thumbnail/>
          </NavItem >
          <Navbar.Text onClick={this.changeView.bind(this, 1)}>
            Items in basket: {this.props.basketData}
          </Navbar.Text>

        </Navbar.Collapse>
      );
    }
  }
};
export {Login}