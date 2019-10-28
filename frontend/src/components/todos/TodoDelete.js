import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import history from "../../history";
import { getTodo, deleteTodo } from "../../actions/todos";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class TodoDelete extends Component {
  componentDidMount() {
    this.props.getTodo(this.props.match.params.id);
  }

  renderContent() {
    if (!this.props.todo) {
      return "Are you sure you want to delete this task?";
    }
    return `Are you sure you want to delete the task: ${this.props.todo.task}`;
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <Modal.Footer>
        <Button variant="danger" onClick={() => this.props.deleteTodo(id)}>
          Delete
        </Button>
        <Button variant="secondary" href="/">
          Cancel
        </Button>
      </Modal.Footer>
    );
  }

  render() {
    return (
      <Modal show onHide={() => history.push("/")}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderContent()}</Modal.Body>
        {this.renderActions()}
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { getTodo, deleteTodo }
)(TodoDelete);
