# prop-types-helper

Tired of writing propTypes on your React App?
Try using propTypesHelper.
it provides proptypes from the default values in the object.

## some examples

```js
import * as helper from 'prop-types-helper';

const types = {
  optional: {
    Array: [],
    Bool: true,
    Func: ()=>{},
    Number: 1,
    Object: {},
    String: '',
    Symbol: Symbol('desc'),
    Element: <div />
  },
  required: {
    Array2: [ 1 ],
    Number2: NaN,
  },
  external: {
    Instance: PropTypes.instanceOf(Message)
  }
}

function StatelessButton(props) {
...
}
StatelessButton.defaultProps = { ...helpers.defaultProps(types) };
StatelessButton.propTypes = { ...helpers.propTypes(types) };
// or
StatelessButton = helpers.attachTypes(StatelessButton, types);

class Button extends Compoment {
  static defaultProps = { ...helpers.defaultProps(types) }
  static propTypes = { ...helpers.propTypes(types) }

...

}
```

** if your linter barks at proptypes, try use spread (`{...xxx}`).
It should be the same as `StatelessButton.propTypes = helpers.propTypes(types);`.

You can also easily toggle between optional and required since it use the same form.

## when you want to see what are genereated

only in dev env,
`setDebug(true)`
will show `console.log` for keys and propTyes

## coverage

`setDebug` will show the followings for the upper example

* Array: PropTypes.array
* Bool: PropTypes.bool
* Func: PropTypes.func
* Number: PropTypes.number
* Object: PropTypes.shape()
* String: PropTypes.string
* Symbol: PropTypes.symbol
* Element: PropTypes.element
* Array2: PropTypes.arrayOf(PropTypes.number).isRequired
* Number2: PropTypes.number.isRequired

If one of those is needed

- `any`
- `customProp`
- `oneOf`
- `oneOfType`
- `node`
- `objectOf`
- `instanceOf`
- `object` ; generated as `shape`
- `array` ; generated only for empyt array.

or precise proptypes, please write that in the `external` parameter.

## License

MIT License
