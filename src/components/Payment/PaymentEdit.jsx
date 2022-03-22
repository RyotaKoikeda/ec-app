import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PrimaryButton } from "../UiKit";
import { push } from "connected-react-router";
import { registerCard, retrievePaymentMethod } from "../../reducks/payments/operations";
import { getCustomerId, getPaymentMethodId } from "../../reducks/users/selectors";

const PaymentEdit = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const selector = useSelector((state) => state);
  const customerId = getCustomerId(selector);
  const paymentMethodId = getPaymentMethodId(selector);

  const [card, setCard] = useState({})

  const register = useCallback(() => {
    dispatch(registerCard(stripe, elements));
  }, [stripe, elements]);

  const goBackToMyPage = useCallback(() => {
    dispatch(push("/user/mypage"));
  }, [dispatch]);

  useEffect(() => {
    (async() => {

    })()
  }, [])

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">
        クレジットカード情報の登録・編集
      </h2>
      <div className="module-spacer--medium" />
      <h3>現在登録されているカード情報</h3>
      <div className="module-spacer--medium" />
      <TextDetail label={} value={} />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={"カード情報を保存する"} onClick={register} />
        <PrimaryButton label={"マイページに戻る"} onClick={goBackToMyPage} />
      </div>
    </section>
  );
};

export default PaymentEdit;
