import React from "react";
import { Route, Switch } from "react-router";
import { Home, Login, SignUp } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  );
};

export default Router;
