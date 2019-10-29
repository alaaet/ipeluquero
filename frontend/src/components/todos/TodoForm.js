import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// Internationalization
import { withTranslation } from "react-i18next";

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
    const { t } = this.props;
    const btnText = `${
      this.props.initialValues ? t("todo.edit") : t("todo.add")
    }`;
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="task"
          component={this.renderField}
          label={t("todo.task")}
        />
        <Button variant="primary" type="submit">
          {btnText}
        </Button>
      </Form>
    );
  }
}

const validate = (formValues, props) => {
  const { t } = props;
  const errors = {};
  if (!formValues.task) {
    errors.task = t("error.1char@least");
  }

  return errors;
};

export default withTranslation()(
  reduxForm({
    form: "todoForm",
    touchOnBlur: false,
    validate
  })(TodoForm)
);
