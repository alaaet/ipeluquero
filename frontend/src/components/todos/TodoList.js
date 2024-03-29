import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos, deleteTodo } from "../../actions/todos";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Internationalization
import { withTranslation } from "react-i18next";

class TodoList extends Component {
  componentWillMount() {
    this.props.getTodos();
  }

  render() {
    const { t } = this.props;
    return (
      <ListGroup>
        <Container>
          {this.props.todos.map(todo => (
            <ListGroup.Item key={todo.id}>
              <Row className="text-center">
                <Col>
                  <Button href={`/edit/${todo.id}`} variant="link">
                    {todo.task}
                  </Button>
                </Col>
                <Col>{todo.created_at}</Col>
                <Col sm className="text-right">
                  <Button href={`/delete/${todo.id}`} variant="danger">
                    {t("todo.delete")}
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </Container>
      </ListGroup>
    );
  }
}

const mapStateToProps = state => ({
  todos: Object.values(state.todos)
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getTodos, deleteTodo }
  )(TodoList)
);
