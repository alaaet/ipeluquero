import React, { Component } from "react";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import Container from "react-bootstrap/Container";

export default class Dashboard extends Component {
  render() {
    return (
      <Container>
        <TodoCreate />
        <TodoList />
      </Container>
    );
  }
}
