const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.key);
const cors = require("cors");

const sendResponse = (response, statusCode, body) => {
  response.send({
    statusCode,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body),
  });
};

exports.stripeCustomer = functions.https.onRequest((req, res) => {
  const corsHandler = cors({ origin: true });

  corsHandler(req, res, () => {
    // POSTメソッドかどうか判定
    if (req.method !== "POST") {
      sendResponse(res, 405, { error: "Invalid Request method!" });
    }

    return stripe.customers
      .create({
        description: "EC App demo user",
        email: req.body.email,
        metadata: { userId: req.body.userId },
        payment_method: req.body.paymentMethod,
      })
      .then((customer) => {
        sendResponse(res, 200, customer);
      })
      .catch((error) => {
        sendResponse(res, 500, { error: error });
      });
  });
});

exports.retrievePaymentMethod = functions.https.onRequest((req, res) => {
  const corsHandler = cors({ origin: true });

  corsHandler(req, res, () => {
    // POSTメソッドかどうか判定
    if (req.method !== "POST") {
      sendResponse(res, 405, { error: "Invalid Request method!" });
    }

    return stripe.paymentMethods
      .retrieve(req.body.paymentMethodId)
      .then((paymentMethod) => {
        sendResponse(res, 200, paymentMethod);
      })
      .catch((error) => {
        sendResponse(res, 500, { error: error });
      });
  });
});

exports.updatePaymentMethod = functions.https.onRequest((req, res) => {
  const corsHandler = cors({ origin: true });

  corsHandler(req, res, () => {
    // POSTメソッドかどうか判定
    if (req.method !== "POST") {
      sendResponse(res, 405, { error: "Invalid Request method!" });
    }

    return stripe.paymentMethods
      .detach(req.body.prevPaymentMethodId)
      .then((paymentMethod) => {
        return stripe.paymentMethods
          .attach(req.body.nextPaymentMethodId, {
            customer: req.body.customerId,
          })
          .then((nextPaymentMethod) => {
            sendResponse(res, 200, nextPaymentMethod);
          });
      })
      .catch((error) => {
        sendResponse(res, 500, { error: error });
      });
  });
});
