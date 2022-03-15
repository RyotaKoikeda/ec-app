import React from "react";
import { Route, Switch } from "react-router";
import {
  CartList,
  OrderConfirm,
  OrderHistory,
  ProductDetail,
  ProductEdit,
  ProductList,
  Reset,
  SignIn,
  SignUp,
  UserMyPage,
} from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signin/reset" component={Reset} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />

      <Auth>
        <Route exact path="(/)?" component={ProductList} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route path="/product/edit(/:id)?" component={ProductEdit} />

        <Route exact path="/cart" component={CartList} />
        <Route exact path="/order/confirm" component={OrderConfirm} />
        <Route exact path="/order/history" component={OrderHistory} />

        <Route exact path="/user/mypage" component={UserMyPage} />
      </Auth>
    </Switch>
  );
};

export default Router;
