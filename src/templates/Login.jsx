import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(push("/"))}>ログインする</button>
    </div>
  );
};

export default Login;
