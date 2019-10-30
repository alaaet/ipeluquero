import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, change_language } from "../../actions/auth";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
// Internationalization
import { withTranslation } from "react-i18next";


class Header extends Component {
  changeLocale = (e,lang) => {
    const prevLang = this.props.lang
    this.props.i18n.changeLanguage(lang);
    this.props.change_language(lang);
    if (lang =='ar' || prevLang == 'ar')
    window.location.reload(false);    
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { t } = this.props;

    const dropDown = (        
    <NavDropdown title={t("dashboard.language")} id="basic-nav-dropdown" >
    <NavDropdown.Item  onClick={(e) => this.changeLocale(e,"en")}>
    <Image style={{width: 30, height: 30}} src="../../../static/frontend/img/en-flag.png" />&nbsp;&nbsp; En
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item  onClick={(e) => this.changeLocale(e,"es")}>
    <Image style={{width: 30, height: 30}} src="../../../static/frontend/img/es-flag.png" />&nbsp;&nbsp; Es
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item  onClick={(e) => this.changeLocale(e,"ar")}>
    <Image style={{width: 30, height: 30}} src="../../../static/frontend/img/ar-flag.png" />&nbsp;&nbsp; Ar
    </NavDropdown.Item>
  </NavDropdown>);

    const userLinks = (
      <Nav className="ml-auto">
          {dropDown}
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
        {dropDown}
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
