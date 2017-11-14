
const evaluatePage = ({
  page, selector, property, expected, gotFunc, done
}) => {
  page
    .evaluate((sel, prop) => {
      if (prop === 'text') {
        return document.querySelector(sel).innerHTML;
      }

      return document.querySelector(sel)[prop];
    }, selector, property)
    .then((gotData) => {
      if (gotFunc) {
        expect(gotFunc(gotData)).toEqual(expected);
      } else {
        expect(gotData).toEqual(expected);
      }
      done();
    });
};

const testElementProperty = ({
  page, title, selector, property, expected, gotFunc
}) => {
  it(title, (done) => {
    evaluatePage({
      page, selector, property, expected, gotFunc, done
    });
  });
};

const testTitle = ({ selector, property, expected }) => (
  `should have '${selector}' element '${property}' property equal to '${expected}'`
);

export {
  testElementProperty, evaluatePage, testTitle
};
