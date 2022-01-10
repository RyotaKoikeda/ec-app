import React from "react";
import { Route, Switch } from "react-router";
import { Login, Home } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};

export default Router;
