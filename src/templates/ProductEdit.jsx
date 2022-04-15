import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import { PrimaryButton, SelectBox, TextInput } from "../components/UiKit";
import { ImageArea, SetSizeArea } from "../components/Products";
import { db } from "../firebase";

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("/product/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(""),
    [images, setImages] = useState([]),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const genders = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">商品の登録・編集</h2>
      <div className="form-wrap">
        <ImageArea images={images} setImages={setImages} />
        <TextInput fullWidth={true} label={"商品名"} multiline={false} required={true} onChange={inputName} rows={1} value={name} type={"text"} />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type={"text"}
        />
        <SelectBox label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category} />
        <SelectBox label={"性別"} required={true} options={genders} select={setGender} value={gender} />
        <TextInput fullWidth={true} label={"価格"} multiline={false} required={true} onChange={inputPrice} rows={1} value={price} type={"number"} />
        <div className="spacer-small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="spacer-small" />
        <div className="center">
          <PrimaryButton label={"商品情報を保存"} onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))} />
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
