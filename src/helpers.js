import PropTypes from 'prop-types';
import { mapValues } from 'lodash';

let DEBUG = false;

export function setDebug(on) {
  DEBUG = !!on;
}
const LOGSTR = str => {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(`${logstr}${str}`);
    logstr = '';
  }
};
let logstr = '';
const LOGSTR_CONTINUE = str => {
  if (DEBUG) {
    logstr = `${logstr}${str}`;
  }
};

function arrayPropType(val, isRequired) {
  if (val.length) {
    LOGSTR_CONTINUE('PropTypes.arrayOf(');
    const propType = PropTypes.arrayOf(getPropType(val[0]));
    if (isRequired) {
      LOGSTR(').isRequired');
      return propType.isRequired;
    }
    LOGSTR(')');
    return propType;
  }
  const propType = PropTypes.array;
  LOGSTR_CONTINUE('PropTypes.array');
  if (isRequired) {
    LOGSTR('.isRequired');
    return propType.isRequired;
  }
  LOGSTR('');
  return propType;
}

function elementPropType(val, isRequired) {
  LOGSTR_CONTINUE('PropTypes.element');
  const propType = PropTypes.element;
  if (isRequired) {
    LOGSTR('.isRequired');
    return propType.isRequired;
  }
  LOGSTR('');
  return propType;
}

function objectPropType(val, isRequired) {
  LOGSTR_CONTINUE('PropTypes.shape(');
  const shape = mapValues(val, (innerVal, innerKey) => getPropType(innerVal, innerKey));
  const propType = PropTypes.shape(shape);
  if (isRequired) {
    LOGSTR(').isRequired');
    return propType.isRequired;
  }
  LOGSTR(')');
  return propType;
}

function isElement(object) {
  const validType =
    (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) ||
    0xeac7;
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === validType
  );
}

const getPropType = (val, key, required) => {
  const LOG = key ? LOGSTR : LOGSTR_CONTINUE;
  let type = '';
  if (Array.isArray(val)) {
    if (key) {
      LOGSTR_CONTINUE(`${key}: `);
    }
    return arrayPropType(val, required);
  } else {
    switch (typeof val) {
      case 'boolean':
        type = 'bool';
        break;
      case 'function':
        type = 'func';
        break;
      case 'object': {
        if (key) {
          LOGSTR_CONTINUE(`${key}: `);
        }
        if (isElement(val)) {
          return elementPropType(val, required);
        }
        return objectPropType(val, required);
      }
      default:
        type = typeof val;
        break;
    }
  }
  if (key) {
    if (type === 'array') {
      LOGSTR('');
    }
    LOGSTR_CONTINUE(`${key}: `);
  }
  if (required) {
    LOG(`PropTypes.${type}.isRequired`);
    return PropTypes[type].isRequired;
  }
  LOG(`PropTypes.${type}`);
  return PropTypes[type];
};

export const propTypes = ({ external, required, optional } = {}) => {
  if (!required && !optional) {
    throw new Error('propTypesHelper needs required or optional with the object of default values');
  }
  return {
    ...mapValues(required, (value, key) => getPropType(value, key, true)),
    ...mapValues(optional, (value, key) => getPropType(value, key)),
    ...external,
  };
};

export const defaultProps = ({ external, optional }) => ({
  ...optional,
  ...external,
});

export const attachTypes = (component, types, options = {}) => {
  if (!options.noDefaultProps) {
    component.defaultProps = { ...defaultProps(types) };
  }
  component.propTypes = { ...propTypes(types) };
  return component;
};
