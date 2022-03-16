import React from "react";
import { PaymentEdit } from "../components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

const stripePromise = loadStripe(
  "pk_test_51KdesUBuMeScyzsUWmV4Epy288uyHy5O3OeDfpaaDj2yoMm3Yj1ooICn7gBVOICTS67DSFIjde0V9XjNJOzXfhSk00vzFAunI7"
);

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentEdit />
    </Elements>
  );
};

export default CheckoutWrapper;
