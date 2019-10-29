import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import history from "../../history";
import { getTodo, deleteTodo } from "../../actions/todos";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// Internationalization
import { withTranslation } from "react-i18next";

class TodoDelete extends Component {
  componentDidMount() {
    this.props.getTodo(this.props.match.params.id);
  }

  renderContent() {
    if (!this.props.todo) {
      return this.props.t('todo.del-frm-confirm');
    }
    return this.props.t('todo.del-frm-confirm-with-task')+ this.props.todo.task;
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <Modal.Footer>
        <Button variant="danger" onClick={() => this.props.deleteTodo(id)}>
        {this.props.t('todo.delete')}
        </Button>
        <Button variant="secondary" onClick={() => history.push("/")}>
        {this.props.t('todo.cancel')}
        </Button>
      </Modal.Footer>
    );
  }

  render() {
    const { t }  = this.props;
    return (
      <Modal show onHide={() => history.push("/")}>
        <Modal.Header closeButton>
          <Modal.Title>{t('todo.del-frm-title')}</Modal.Title>
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

export default withTranslation()(connect(
  mapStateToProps,
  { getTodo, deleteTodo }
)(TodoDelete));
