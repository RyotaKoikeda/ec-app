import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PrimaryButton, TextDetail } from "../UiKit";
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

  const [card, setCard] = useState({});

  const register = useCallback(() => {
    dispatch(registerCard(stripe, elements, customerId));
  }, [stripe, elements, customerId]);

  const goBackToMyPage = useCallback(() => {
    dispatch(push("/user/mypage"));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const cardData = await retrievePaymentMethod(paymentMethodId);
      if (cardData) {
        setCard(cardData);
      }
    })();
  }, [paymentMethodId]);

  const cardNumber = useMemo(() => {
    if (card.last4) {
      return "**** **** ****" + card.last4;
    } else {
      return "未登録";
    }
  }, [card]);

  return (
    <section>
      <div className="form-wrap">
        <h2 className="page-title">クレジットカード情報の編集</h2>
        <div className="spacer-small" />
        <h3>現在登録されているカード情報</h3>
        <div className="spacer-small" />
        <TextDetail label={card.brand} value={cardNumber} />
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
        <div className="spacer-medium" />
        <div className="center">
          <PrimaryButton label={"カード情報を保存する"} onClick={register} />
          <PrimaryButton label={"マイページに戻る"} onClick={goBackToMyPage} />
        </div>
      </div>
    </section>
  );
};

export default PaymentEdit;
