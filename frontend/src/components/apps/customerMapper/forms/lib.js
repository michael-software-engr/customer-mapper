
const formatForSelect = list => (
  list.map((item) => {
    if (typeof item === 'string') {
      return { text: item, value: item };
    } else if (typeof item === 'object') {
      return { text: item.name, value: item.id };
    }

    throw Error(`Item invalid type '${item}'`);
  })
);

const exp = {
  formatForSelect
};

export {
  formatForSelect
};

export default exp;
