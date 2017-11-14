
// // TODO: maybe?
// // https://github.com/facebook/jest/issues/2098
// // https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array
// const localStorageMock = ((function localStorageMockFunc() {
//   let store = {};

//   return {
//     getItem: key => store[key] || null,
//     setItem: (key, value) => { store[key] = value.toString(); },
//     clear: () => { store = {}; }
//   };
// })());

// export default localStorageMock;

// // const localStorageMock = ((function localStorageMockFunc() {
// //   let store = {};

// //   return {
// //     getItem: key => store[key] || null,
// //     setItem: (key, value) => { store[key] = value.toString(); },
// //     clear: () => { store = {}; }
// //   };
// // })());

// // Object.defineProperty(window, 'localStorage', {
// //   value: localStorageMock
// // });
