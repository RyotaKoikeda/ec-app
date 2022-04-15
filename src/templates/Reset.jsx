import React, { useCallback, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UiKit";
import { useDispatch } from "react-redux";
import { resetPassword } from "../reducks/users/operations";
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <div className="container">
      <h2 className="page-title">パスワードのリセット</h2>
      <div className="form-wrap">
        <TextInput fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail} />
        <div className="spacer-small" />
        <div className="center">
          <PrimaryButton label={"Reset Password"} onClick={() => dispatch(resetPassword(email))} />
          <div className="spacer-small" />
          <p onClick={() => dispatch(push("/signin"))}>ログイン画面に戻る</p>
        </div>
      </div>
    </div>
  );
};

export default Reset;
