import { CardElement } from "@stripe/react-stripe-js";
import { db } from "../../firebase/index";
import { push } from "connected-react-router";
import { updateUserStateAction } from "../users/actions";

const headers = new Headers();
headers.set("Content-type", "application/json");
const BASE_URL = "https://ec-app2-278ae.web.app";

const createCustomer = async (email, paymentMethodId, uid) => {
  const response = await fetch(BASE_URL + "/v1/customer", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      paymentMethod: paymentMethodId,
      userId: uid,
    }),
  });

  const customerResponse = await response.json();
  return JSON.parse(customerResponse.body);
};

export const retrievePaymentMethod = async (paymentMethodId) => {
  const response = await fetch(BASE_URL + "/v1/paymentMethod", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      paymentMethodId: paymentMethodId,
    }),
  });

  const paymentMethodResponse = await response.json();
  const paymentMethod = JSON.parse(paymentMethodResponse.body);
  console.log(paymentMethod);
  return paymentMethod.card;
};

const updatePaymentMethod = async (
  customerId,
  prevPaymentMethodId,
  nextPaymentMethodId
) => {
  const response = await fetch(BASE_URL + "/v1/updatePaymentMethod", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      customerId: customerId,
      prevPaymentMethodId: prevPaymentMethodId,
      nextPaymentMethodId: nextPaymentMethodId,
    }),
  });

  const paymentMethodResponse = await response.json();
  const paymentMethod = JSON.parse(paymentMethodResponse.body);
  return paymentMethod.card;
};

export const registerCard = (stripe, elements, customerId) => {
  return async (dispatch, getState) => {
    const user = getState().users;
    const email = user.email;
    const uid = user.uid;

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      return;
    }

    const paymentMethodId = paymentMethod.id;

    if (customerId === "") {
      const customerData = await createCustomer(email, paymentMethodId, uid);

      if (customerData.id === "") {
        alert("カード情報の登録に失敗しました。");
        return;
      } else {
        const updateUserState = {
          customer_id: customerData.id,
          payment_method_id: paymentMethodId,
        };

        db.collection("users")
          .doc(uid)
          .update(updateUserState)
          .then(() => {
            dispatch(updateUserStateAction(updateUserState));
            dispatch(push("/user/mypage"));
          })
          .catch((error) => {
            // Delete stripe customer

            alert("カード情報の登録に失敗しました");
            return;
          });
      }
    } else {
      const prevPaymentMethodId = getState().users.payment_method_id;
      const updatedPaymentMethod = await updatePaymentMethod(
        customerId,
        prevPaymentMethodId,
        paymentMethodId
      );

      if (!updatedPaymentMethod) {
        alert("お客様情報の登録に失敗しました。");
      } else {
        const userState = {
          payment_method_id: paymentMethodId,
        };
        db.collection("users")
          .doc(uid)
          .update(userState)
          .then(() => {
            dispatch(updateUserStateAction(userState));
            alert("お客様情報を更新しました。");
            dispatch(push("/user/mypage"));
          })
          .catch(() => {
            alert("お客様情報の更新に失敗しました。");
          });
      }
    }
  };
};
