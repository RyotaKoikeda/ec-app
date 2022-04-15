import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { PrimaryButton, GreyButton } from "../components/UiKit";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 && productsInCart.map((product) => <CartListItem key={product.cartId} product={product} />)}
      </List>
      <div className="spacer-medium" />
      <div className="flex-column">
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        <div className="spacer-small" />
        <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </div>
  );
};

export default CartList;
