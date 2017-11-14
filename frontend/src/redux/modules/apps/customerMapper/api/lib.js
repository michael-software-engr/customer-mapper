
const byCityAndState = customers => (
  customers.reduce((memo, customer) => {
    const { city, state } = customer;
    const cityAndState = `${city}, ${state}`;
    const currentValue = memo[cityAndState] || [];

    return {
      ...memo,
      [cityAndState]: [...currentValue, customer]
    };
  }, {})
);

const byZip = customers => (
  customers.reduce((memo, customer) => {
    const { zip } = customer;
    const currentValue = memo[zip] || [];

    return {
      ...memo,
      [zip]: [...currentValue, customer]
    };
  }, {})
);

const exp = {
  byCityAndState,
  byZip
};

export default exp;
