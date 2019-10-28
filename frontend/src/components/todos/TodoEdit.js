import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodo, editTodo } from "../../actions/todos";
import TodoForm from "./TodoForm";
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
      <Container style={{
      marginBottom: "15px",
      background: "#f7f7f7",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
      padding: "30px" }}>        
        <h2 style={{ marginTop: "2rem" }}>Edit Todo</h2>
        <TodoForm
          initialValues={_.pick(this.props.todo, "task")}
          enableReinitialize={true}
          onSubmit={this.onSubmit}
        />
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
