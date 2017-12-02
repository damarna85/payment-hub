import stripePackage from 'stripe';

const stipeCharge = (
  client,
  { amount, currency, token, description, isCapture }
) =>
  new Promise((resolve, reject) => {
    client.charges.create(
      {
        capture: isCapture,
        amount,
        currency,
        source: token,
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
    authorize: charge => stipeCharge(client, { ...charge, isCapture: false }),
    capture: ({ amount, currency, token, description }) =>
      stipeCharge(client, { ...charge, isCapture: true }),
  };
};
