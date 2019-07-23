import {expect} from 'chai';
import {noop, of} from 'rxjs';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import {distinctUntilDeepChanged} from '../../src/operators';

describe('operators/distinctUntilDeepChanged', () => {
  let emissions: number;

  function incrementEmissions() {
    emissions++;
  }

  beforeEach('Reset emissions', () => {
    emissions = 0;
  });

  it('Shallow should emit twice', cb => {
    of([1], [1])
      .pipe(
        distinctUntilChanged<number[]>(),
        tap(incrementEmissions, noop, () => {
          expect(emissions).to.equal(2);
          cb();
        })
      )
      .subscribe(noop, cb);
  });

  it('Deep should emit once', cb => {
    of([1], [1])
      .pipe(
        distinctUntilDeepChanged<number[]>(),
        tap(incrementEmissions, noop, () => {
          expect(emissions).to.equal(1);
          cb();
        })
      )
      .subscribe(noop, cb);
  });
});
