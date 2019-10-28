import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions/todos";
import TodoForm from "./TodoForm";
import Jumbotron from "react-bootstrap/Jumbotron";

export class TodoCreate extends Component {
  onSubmit = formValues => {
    this.props.addTodo(formValues);
  };

  render() {
    return (
      <Jumbotron style={{ marginTop: "2rem" }}>
        <TodoForm destroyOnUnmount={false} onSubmit={this.onSubmit} />
      </Jumbotron>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(TodoCreate);
