import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import RegisterForm from "./auth/RegisterForm";
import LoginForm from "./auth/LoginForm";
import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../actions/auth";

import store from "../store";
import Dashboard from "./todos/Dashboard";
import Header from "./layout/Header";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import TodoDelete from "./todos/TodoDelete";
import TodoEdit from "./todos/TodoEdit";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route exact path="/delete/:id" component={TodoDelete} />
            <Route exact path="/edit/:id" component={TodoEdit} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/login" component={LoginForm} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
