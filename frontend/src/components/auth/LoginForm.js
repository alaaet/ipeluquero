import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login, social_login } from "../../actions/auth";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
// Internationalization
import { withTranslation } from "react-i18next";

class LoginForm extends Component {
  renderField = ({ input, meta: { touched, error }, ...props }) => {
    return (
      <Form.Group>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control {...props} {...input} />
        {touched && error && (
          <Alert key="1" variant="danger">
            {error}
          </Alert>
        )}
      </Form.Group>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className="field">
        <input type={type} />
        {error && (
          <Alert key="1" variant="danger">
            {error}
          </Alert>
        )}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.login(formValues);
  };

  componentClicked = () => {
    //console.log("facebook login was clicked");
  };

  responseFacebook = response => {
    //console.log(response);
    const names = response.name.split(" ");
    const first_name = names.length > 1 ? names.slice(0, -1).join(" ") : names;
    const last_name = names.length > 1 ? names.splice(-1)[0] : "";
    this.props.social_login({
      username: names.join(" "),
      email: response.email,
      given_name: first_name,
      family_name: last_name,
      user_id: response.userID,
      social_token: response.accessToken,
      provider: "Facebook",
      image_url: response.picture.data.url
    });
  };

  responseGoogle = response => {
    //console.log(response);
    this.props.social_login({
      username: response.w3.ig,
      email: response.w3.U3,
      given_name: response.w3.ofa,
      family_name: response.w3.wea,
      user_id: response.googleId,
      social_token: response.accessToken,
      provider: "Google",
      image_url: response.w3.Paa
    });
  };

  render() {
    const { t } = this.props;
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Container
        style={{
          marginTop: "2rem",
          border: "1px",
          marginBottom: "15px",
          background: "#f7f7f7",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
          padding: "30px",
          width: "340px"
        }}
      >
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="username"
            type="text"
            component={this.renderField}
            label={t("login-frm.email")}
          />
          <Field
            name="password"
            type="password"
            component={this.renderField}
            label={t("login-frm.password")}
          />
          <Field
            name="non_field_errors"
            type="hidden"
            component={this.hiddenField}
            label={t("login-frm.password")}
          />
          <Button variant="primary" type="submit">
            {t("login-frm.login")}
          </Button>
        </Form>
        <p style={{ marginTop: "1rem" }}>
          {t("login-frm.no-account-msg")}{" "}
          <Link to="/register">{t("login-frm.register")}</Link>
        </p>
        <FacebookLogin
          appId="2461085464128920"
          textButton={t("login-frm.fb-login")}
          autoLoad={false}
          fields="name,email,picture"
          version="4.0"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          cssClass="btn btn-block btn-social btn-facebook"
          icon="fa fa-facebook"
        />
        <GoogleLogin
          clientId="676403624626-5ci6jih0hne9alruh26jsm26nbaqinbi.apps.googleusercontent.com"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={renderProps => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="btn btn-block btn-social btn-google"
            >
              {" "}
              <span className="fa fa-google"></span>
              {t("login-frm.ggl-login")}
            </Button>
          )}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
LoginForm = withTranslation()(
  connect(
    mapStateToProps,
    { login, social_login }
  )(LoginForm)
);
export default reduxForm({
  form: "loginForm"
})(LoginForm);
