import {expect} from 'chai';
import {noop, of} from 'rxjs';
import {distinctUntilChanged, last, tap} from 'rxjs/operators';
import {countEmissions, distinctUntilDeepChanged} from '../../src/operators';

describe('operators/distinctUntilDeepChanged', () => {
  it('Shallow should emit twice', cb => {
    of([1], [1])
      .pipe(
        distinctUntilChanged<number[]>(),
        countEmissions(),
        last(),
        tap(emissions => {
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
        countEmissions(),
        last(),
        tap(emissions => {
          expect(emissions).to.equal(1);
          cb();
        })
      )
      .subscribe(noop, cb);
  });
});
