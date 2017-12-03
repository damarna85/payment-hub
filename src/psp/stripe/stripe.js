import stripePackage from 'stripe';

const stipeCharge = (
  client,
  { amount, currency, paymentData, description, capture = false }
) =>
  new Promise((resolve, reject) => {
    client.charges.create(
      {
        capture,
        amount,
        currency,
        source: paymentData.token,
        description,
      },
      function(err, charge) {
        if (err) reject(err);
        resolve(charge);
      }
    );
  });

export const stripeClient = config => {
  const client = stripePackage(config.secret);
  return {
    authorize: charge => stipeCharge(client, charge),
    capture: charge => stipeCharge(client, { ...charge, capture: true }),
  };
};
