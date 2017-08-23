import { expect } from 'chai';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import * as helper from '../src/helpers';

import { external, optional, required } from '../assets/test/types';

helper.setDebug(true);

describe('propTypesHelper', () => {
  describe('propTypes', () => {
    // eslint-disable-next-line no-console
    let orgLog = console.error;
    before(function() {
      // eslint-disable-next-line no-console
      console.error = message => {
        throw new Error(message);
      };
    });
    after(function() {
      // eslint-disable-next-line no-console
      console.error = orgLog;
    });

    it('should throw exceptions if no required or optional', done => {
      try {
        helper.propTypes({});
        return done('couldn`t catch the exception');
      } catch(err) {
        // suceed
      }
      try {
        helper.propTypes();
        return done('couldn`t catch the exception');
      } catch(err) {
        done();
      }
    });

    it('should return an object with keys in external, required and optional', () => {
      const ret = helper.propTypes({ external, required, optional });
      const sortedKey = Object.keys(ret).sort();
      const inputKey = Object.keys(Object.assign({}, external, required, optional)).sort();
      expect(isEqual(sortedKey, inputKey)).to.be.true;
    });

    it('should have proper propTypes', done => {
      const ret = helper.propTypes({ optional });
      try {
        PropTypes.checkPropTypes(ret, { ...optional, test2: true }, 'optional', 'MyTest');
      } catch (err) {
        return done(err);
      }
      done();
    });

    // it('should override external if there are the same key in required or optional', () => {
    // });

    // it('should throw exceptions if there are the same key in the required and optional', () => {
    // });
  });
  describe('defaultProps', () => {
    it('should throw exceptions if no optional', done => {
      try {
        helper.defaultProps({});
        return done('couldn`t catch the exception');
      } catch(err) {
        // suceed
      }
      try {
        helper.defaultProps();
        return done('couldn`t catch the exception');
      } catch(err) {
        done();
      }
    });

    it('should return an object with keys in required, and optional', () => {
      const ret = helper.defaultProps({ external, required, optional });
      const sortedKey = Object.keys(ret).sort();
      const inputKey = Object.keys(Object.assign({}, external, optional)).sort();
      expect(isEqual(sortedKey, inputKey)).to.be.true;
    });
  });
});
