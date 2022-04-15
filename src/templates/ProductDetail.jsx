import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import HTMLReactParser from "html-react-parser";
import { ImageSwiper, SizeTable } from "../components/Products";
import { addProductToCart } from "../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: "auto",
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  price: {
    fontSize: 24,
  },
}));

const ProductDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setProduct(data);
      });
  }, []);

  const addProduct = useCallback(
    (selectedSize) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          quantity: 1,
          size: selectedSize,
        })
      );
    },
    [product]
  );

  const returnCodeToBr = (text) => {
    if (text === "") {
      return text;
    } else {
      return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
    }
  };

  return (
    <div className="container">
      {product && (
        <div className="flex-row">
          <div id="swiper-detail" className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <div className="spacer-medium" />
            <h2 className="page-title">{product.name}</h2>
            <div className="spacer-medium" />
            <p className={classes.price}>¥{product.price.toLocaleString()}</p>
            <div className="spacer-small" />
            <SizeTable addProduct={addProduct} sizes={product.sizes} />
            <div className="spacer-small" />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
