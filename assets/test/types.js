// test prop types
// Keys are from https://github.com/facebook/prop-types
//

class Message {
}

export const optional = {
  optionalArray: [],
  optionalArray2: [ 1 ],
  optionalBool: true,
  optionalFunc: ()=>{},
  optionalNumber: 1,
  optionalNumber2: NaN,
  optionalObject: {},
  optionalString: '',
  optionalSymbol: Symbol('desc'),

  // A React element.
  optionalElement: {
    $$typeof: Symbol.for('react.element')
  },
};

export const required = {
  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: ()=>{},
}

export const external = {
  externalKey: 'supposed to be like PropTypes.string',
}

export default {
  required,
  optional,
  external
};
