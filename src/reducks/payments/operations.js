import { CardElement } from "@stripe/react-stripe-js";

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

export const registerCard = (stripe, elements) => {
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

    const customerData = await createCustomer(email, paymentMethodId, uid);
  };
};
