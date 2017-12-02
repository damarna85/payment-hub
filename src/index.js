import { stripeClient } from './psp/stripe';
import { braintreeClient } from './psp/braintree';

const availablePsp = ['stripe', 'paypal', 'adyen', 'braintree'];

const createPspClient = ({ psp, config }) => {
  switch (psp) {
    case 'stripe':
      return stripeClient(config);
    case 'braintree':
      return braintreeClient(config);
    default:
      return undefined;
  }
};

const createPaymentHub = options =>
  Object.entries(options).reduce(
    (acc, [psp, config]) =>
      !availablePsp.includes(psp)
        ? acc
        : {
            ...acc,
            [psp]: createPspClient({ psp, config }),
          },
    {}
  );

module.exports = {
  createPaymentHub,
};
