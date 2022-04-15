import React, { useCallback, useState } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UiKit";
import { signIn } from "../reducks/users/operations";
import LockIcon from "@material-ui/icons/Lock";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="container">
      <div className="page-logo">
        <LockIcon />
      </div>
      <h2 className="page-title">サインイン</h2>
      <div className="form-wrap">
        <TextInput fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail} />
        <TextInput
          fullWidth={true}
          label={"パスワード"}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type={"password"}
          onChange={inputPassword}
        />
        <div className="spacer-small" />
        <div className="center">
          <PrimaryButton label={"Sign in"} onClick={() => dispatch(signIn(email, password))} />
          <div className="center">
            <p>メールアドレス admin@gmail.com</p>
            <div className="spacer-small" />
            <p>パスワード Admin0123</p>
          </div>
          <div className="spacer-large" />
          <p onClick={() => dispatch(push("/signup"))}>アカウントをお持ちではない方はこちら</p>
          <p onClick={() => dispatch(push("/signin/reset"))}>パスワードを忘れた方はこちら</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
