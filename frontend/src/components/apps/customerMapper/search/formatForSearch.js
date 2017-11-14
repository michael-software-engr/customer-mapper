
const formatForSearch = customersByX => (
  Object.keys(customersByX).sort().map((title) => {
    const count = customersByX[title].length;
    const customerSP = count === 1 ? 'customer' : 'customers';

    // Semantic UI specific keys
    return {
      title,
      description: `${count} ${customerSP}`
    };
  })
);

// const byCityAndState = (customers) => {
//   const customersByCityAndState = customers.reduce((memo, customer) => {
//     const { city, state } = customer;
//     const title = `${city}, ${state}`;
//     const currentValue = memo[title] || 0;

//     return {
//       ...memo,
//       [title]: currentValue + 1
//     };
//   }, {});

//   return Object.keys(customersByCityAndState).sort().map((title) => {
//     const count = customersByCityAndState[title];
//     const customerSP = count === 1 ? 'customer' : 'customers';

//     // Semantic UI specific keys
//     return {
//       title,
//       description: `${count} ${customerSP}`
//     };
//   });
// };

// const byZip = (customers) => {
//   const customersByZip = customers.reduce((memo, customer) => {
//     const { zip } = customer;
//     const currentValue = memo[zip] || 0;

//     return {
//       ...memo,
//       [zip]: currentValue + 1
//     };
//   }, {});

//   return Object.keys(customersByZip).sort().map((title) => {
//     const count = customersByZip[title];
//     const customerSP = count === 1 ? 'customer' : 'customers';

//     // Semantic UI specific keys
//     return {
//       title,
//       description: `${count} ${customerSP}`
//     };
//   });
// };

// const exp = {
//   formatForSearch
//   // byCityAndState,
//   // byZip
// };

export default formatForSearch;
