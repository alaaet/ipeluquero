import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login, social_login } from "../../actions/auth";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

class LoginForm extends Component {
  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? "error" : ""}`}>
        <label>{label}</label>
        <input {...input} type={type} />
        {touched && error && (
          <span className="ui pointing red basic label">{error}</span>
        )}
      </div>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className="field">
        <input type={type} />
        {error && <div className="ui red message">{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.login(formValues);
  };

  componentClicked = () => {
    console.log("facebook login was clicked");
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
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ui container">
        <div className="ui segment">
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form"
          >
            <Field
              name="username"
              type="text"
              component={this.renderField}
              label="Email"
            />
            <Field
              name="password"
              type="password"
              component={this.renderField}
              label="Password"
            />
            <Field
              name="non_field_errors"
              type="hidden"
              component={this.hiddenField}
            />
            <button className="ui primary button">Login</button>
          </form>
          <p style={{ marginTop: "1rem" }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <FacebookLogin
            appId="2461085464128920"
            autoLoad={false}
            fields="name,email,picture"
            version="4.0"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
          <GoogleLogin
            clientId="676403624626-5ci6jih0hne9alruh26jsm26nbaqinbi.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
LoginForm = connect(
  mapStateToProps,
  { login, social_login }
)(LoginForm);
export default reduxForm({
  form: "loginForm"
})(LoginForm);
