
const inputsNotValid = (objOrArrayOfInputs, properties) => {
  const inputValues = properties ? properties.map(
    property => objOrArrayOfInputs[property]
  ) : objOrArrayOfInputs;

  return inputValues.some(value => !!value === false);
};

const exp = { inputsNotValid };

export default exp;
