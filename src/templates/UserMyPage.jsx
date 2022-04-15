import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { PrimaryButton, TextDetail } from "../components/UiKit";
import { getUsername } from "../reducks/users/selectors";

const UserMyPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const username = getUsername(selector);

  const transition = useCallback(
    (path) => {
      dispatch(push(path));
    },
    [dispatch]
  );

  return (
    <div className="container">
      <h2 className="page-title">マイページ</h2>
      <div className="form-wrap">
        <TextDetail label={"ユーザー名"} value={username} />
        <div className="spacer-medium" />
        <div className="center">
          <PrimaryButton label={"カード情報の編集"} onClick={() => transition("/user/payment/edit")} />
          <PrimaryButton label={"注文履歴の確認"} onClick={() => transition("/order/history")} />
        </div>
      </div>
    </div>
  );
};

export default UserMyPage;
