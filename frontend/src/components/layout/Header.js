import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// Internationalization
import "../../i18n";
import { useTranslation } from "react-i18next";

class Header extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { t, i18n } = useTranslation();
    const userLinks = (
      <Nav className="ml-auto">
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            {t("welcome.1")} {user ? user.username : ""} ...
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" onClick={this.props.logout}>
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto">
        <Nav.Item>
          <Nav.Link href="/register">Sign Up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
      </Nav>
    );

    // Bootstrap functions
    const handleSelect = () => {};

    return (
      <Navbar expand="lg" className="navbar-dark bg-primary">
        <Navbar.Brand href="/">TodoCRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
          </Nav>
          {isAuthenticated ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
