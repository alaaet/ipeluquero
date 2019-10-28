import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../actions/auth';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

class RegisterForm extends Component {
  renderField = ({ input, meta: { touched, error },  ...props}) => {
    return (
      <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control {...props} {...input} className= {touched?error?"is-invalid":"is-valid":""} />
      {touched && error && (
        <Alert key="1" variant="danger">
          {error}
        </Alert>
      )}
    </Form.Group>
    );
  };

  onSubmit = formValues => {
    this.props.register(formValues);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
      <Container style={{ marginTop: "2rem", border:"1px",
      marginBottom: "15px",
      background: "#f7f7f7",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
      padding: "30px",
      width:'340px' }}>
          <Form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Field
              name='username'
              type='text'
              component={this.renderField}
              label='Username'
              validate={[required, minLength3]}
            />
            <Field
              name='email'
              type='email'
              component={this.renderField}
              label='Email'
              validate={[required, minLength3]}
            />
            <Field
              name='password'
              type='password'
              component={this.renderField}
              label='Password'
              validate={required}
            />
            <Field
              name='password2'
              type='password'
              component={this.renderField}
              label='Confirm Password'
              validate={[required, passwordsMatch]}
            />
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <p style={{ marginTop: '1rem' }}>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
      </Container>
    );
  }
}

const required = value => (value ? undefined : 'Required');

const minLength = min => value =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;

const minLength3 = minLength(3);

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15);

const passwordsMatch = (value, allValues) =>
  value !== allValues.password ? 'Passwords do not match' : undefined;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

RegisterForm = connect(
  mapStateToProps,
  { register }
)(RegisterForm);

export default reduxForm({
  form: 'registerForm'
})(RegisterForm);