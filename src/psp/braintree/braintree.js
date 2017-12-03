import braintree from 'braintree';

const braintreeCharge = (
  client,
  { amount, currency, paymentData, capture = false }
) =>
  new Promise((resolve, reject) => {
    client.transaction.sale(
      {
        options: {
          submitForSettlement: capture,
        },
        amount,
        paymentMethodNonce: paymentData.paymentMethodNonce,
      },
      function(err, result) {
        if (err) reject(err);
        resolve(result.transaction);
      }
    );
  });

export const braintreeClient = config => {
  const gateway = braintree.connect({
    environment: config.environment,
    merchantId: config.merchantId,
    publicKey: config.publicKey,
    privateKey: config.privateKey,
  });
  return {
    authorize: charge => braintreeCharge(gateway, charge),
    capture: charge => braintreeCharge(gateway, { ...charge, capture: true }),
  };
};
