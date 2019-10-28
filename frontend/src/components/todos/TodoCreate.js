import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions/todos";
import TodoForm from "./TodoForm";
import Container from "react-bootstrap/Container";

export class TodoCreate extends Component {
  onSubmit = formValues => {
    this.props.addTodo(formValues);
  };

  render() {
    return (
      <Container style={{
      marginBottom: "15px",
      background: "#f7f7f7",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
      padding: "30px" }}>
        <TodoForm destroyOnUnmount={false} onSubmit={this.onSubmit} />
      </Container>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(TodoCreate);
