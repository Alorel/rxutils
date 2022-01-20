import {expect} from 'chai';
import {of} from 'rxjs';
import {distinctUntilChanged, last, tap} from 'rxjs/operators';
import {countEmissions} from './countEmissions';
import {distinctUntilDeepChanged} from './distinctUntilDeepChanged';

describe('operators/distinctUntilDeepChanged', () => {
  it('Shallow should emit twice', async () => {
    await of([1], [1])
      .pipe(
        distinctUntilChanged<number[]>(),
        countEmissions(),
        last(),
        tap(emissions => {
          expect(emissions).to.eq(2); // eslint-disable-line @typescript-eslint/no-magic-numbers
        })
      )
      .toPromise();
  });

  it('Deep should emit once', async () => {
    await of([1], [1])
      .pipe(
        distinctUntilDeepChanged<number[]>(),
        countEmissions(),
        last(),
        tap(emissions => {
          expect(emissions).to.equal(1);
        })
      )
      .toPromise();
  });
});
