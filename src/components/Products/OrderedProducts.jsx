import React, { useCallback } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { PrimaryButton } from "../UiKit";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import NoImage from "../../assets/img/src/no_image.png";

const useStyles = makeStyles({
  list: {
    height: "auto",
    background: "#fff",
  },
  image: {
    width: 96,
    height: 96,
    margin: "8px 16px 8px 0",
    objectFit: "cover",
  },
  text: {
    width: "100%",
  },
});

const OrderedProducts = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = props.products;

  const goToProductDetail = useCallback((id) => {
    dispatch(push("/product/" + id));
  }, []);

  return (
    <List>
      {products.map((product, id) => (
        <React.Fragment key={id}>
          <ListItem className={classes.list}>
            <ListItemAvatar>
              <img
                className={classes.image}
                src={
                  product.images.length > 0 ? product.images[0].path : NoImage
                }
                alt={"Ordered Product"}
              />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText
                primary={product.name}
                secondary={"サイズ: " + product.size}
              />
              <ListItemText primary={"¥" + product.price.toLocaleString()} />
            </div>
            <PrimaryButton
              label={"商品詳細を見る"}
              onClick={() => goToProductDetail(product.id)}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default OrderedProducts;
