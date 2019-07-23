import {expect} from 'chai';
import * as index from '../src';
import * as operators from '../src/operators';

describe('index', () => {
  it('Should export operators', () => {
    expect(index).to.haveOwnProperty('operators');
  });

  it('operators should === those exported from src/operators', () => {
    expect(index.operators).to.deep.eq(operators);
  });
});
