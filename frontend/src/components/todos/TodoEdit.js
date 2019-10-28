import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodo, editTodo } from "../../actions/todos";
import TodoForm from "./TodoForm";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

class TodoEdit extends Component {
  componentDidMount() {
    this.props.getTodo(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editTodo(this.props.match.params.id, formValues);
  };

  render() {
    return (
      <Container>
        <Jumbotron style={{ marginTop: "2rem" }}>
          <h2 style={{ marginTop: "2rem" }}>Edit Todo</h2>
          <TodoForm
            initialValues={_.pick(this.props.todo, "task")}
            enableReinitialize={true}
            onSubmit={this.onSubmit}
          />
        </Jumbotron>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { getTodo, editTodo }
)(TodoEdit);
