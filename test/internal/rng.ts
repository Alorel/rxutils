import {expect} from 'chai';
import {rng} from '../../src/internal/rng';

describe('internal/rng', () => {
  it('Should throw if lower is NaN', () => {
    expect(() => rng(<any>'1', 1)).to
      .throw(TypeError, 'Lower is not a number');
  });

  it('Should throw if upper is NaN', () => {
    expect(() => rng(1, <any>'1')).to
      .throw(TypeError, 'Upper is not a number');
  });

  it('Should throw if lower > upper', () => {
    expect(() => rng(2, 1)).to
      .throw(Error, 'Lower bound is greater than upper bound');
  });

  it('Should return 1st argument if arg1 === arg2', () => {
    expect(rng(10, 10)).to.equal(10);
  });

  it('Should generate a random number if both values are different', () => {
    for (let i = 0; i < 100; i++) {
      const out = rng(10, 20);

      expect(out >= 10).to.be.true;
      expect(out <= 20).to.be.true;
    }
  });
});
