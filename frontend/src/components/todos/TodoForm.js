import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class TodoForm extends Component {
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

  onSubmit = formValues => {
    console.log("FORM VALUES: " + JSON.stringify(formValues));
    this.props.onSubmit(formValues);
  };

  render() {
    const btnText = `${this.props.initialValues ? "Update" : "Add"}`;
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="task" component={this.renderField} label="Task" />
        <Button variant="primary" type="submit">
          {btnText}
        </Button>
      </Form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.task) {
    errors.task = "Please enter at least 1 character";
  }

  return errors;
};

export default reduxForm({
  form: "todoForm",
  touchOnBlur: false,
  validate
})(TodoForm);
