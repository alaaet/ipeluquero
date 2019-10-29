import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, change_language } from "../../actions/auth";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// Internationalization
import { withTranslation } from "react-i18next";

class Header extends Component {
  changeLocale = lang => {
    this.props.i18n.changeLanguage(lang);
    this.props.change_language(lang);
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { t } = this.props;
    const userLinks = (
      <Nav className="ml-auto">
        <NavDropdown title={t("dashboard.language")} id="basic-nav-dropdown">
          <NavDropdown.Item href="#" onClick={() => this.changeLocale("en")}>
            En
          </NavDropdown.Item>
          <NavDropdown.Item href="#" onClick={() => this.changeLocale("es")}>
            Es
          </NavDropdown.Item>
          <NavDropdown.Item href="#" onClick={() => this.changeLocale("ar")}>
            Ar
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            {t("dashboard.welcome")} {user ? user.username : ""} ...
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" onClick={this.props.logout}>
            {t("dashboard.logout")}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto">
        <NavDropdown title={t("dashboard.language")} id="basic-nav-dropdown">
          <NavDropdown.Item href="#" onClick={() => this.changeLocale("en")}>
            En
          </NavDropdown.Item>
          <NavDropdown.Item href="#" onClick={() => this.changeLocale("es")}>
            Es
          </NavDropdown.Item>
          <NavDropdown.Item href="#" onClick={() => this.changeLocale("ar")}>
            Ar
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link href="/register">{t("dashboard.sign-up")}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login">{t("dashboard.login")}</Nav.Link>
        </Nav.Item>
      </Nav>
    );

    // Bootstrap functions
    const handleSelect = () => {};

    return (
      <Navbar expand="lg" className="navbar-dark bg-primary">
        <Navbar.Brand href="/">{t("app-title")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link href="/">{t("dashboard.home")}</Nav.Link>
            </Nav.Item>
          </Nav>
          {isAuthenticated ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  lang: state.auth.lang
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { logout, change_language }
  )(Header)
);
