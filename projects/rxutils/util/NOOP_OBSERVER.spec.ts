import {expect} from 'chai';
import {noop} from 'rxjs';
import {NOOP_OBSERVER} from '../../rxutils';

describe('util/NOOP_OBSERVER', function () {
  for (const m of ['complete', 'error', 'next']) {
    it(`${m}() should be rxjs' noop`, () => {
      expect(NOOP_OBSERVER.next).to.eq(noop);
    });
  }

  it('Should be frozen', () => {
    expect(NOOP_OBSERVER).to.be.frozen; // eslint-disable-line no-unused-expressions
  });
});
