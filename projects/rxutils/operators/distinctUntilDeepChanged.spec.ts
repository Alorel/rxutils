import {expect} from 'chai';
import {lastValueFrom, of} from 'rxjs';
import {distinctUntilChanged, last} from 'rxjs/operators';
import {countEmissions} from './countEmissions';
import {distinctUntilDeepChanged} from './distinctUntilDeepChanged';

describe('operators/distinctUntilDeepChanged', () => {
  it('Shallow should emit twice', async () => {
    const o$ = of([1], [1])
      .pipe(
        distinctUntilChanged<number[]>(),
        countEmissions(),
        last()
      );
    expect(await lastValueFrom(o$)).to.eq(2); // eslint-disable-line @typescript-eslint/no-magic-numbers
  });

  it('Deep should emit once', async () => {
    const o$ = of([1], [1])
      .pipe(
        distinctUntilDeepChanged<number[]>(),
        countEmissions(),
        last()
      );
    expect(await lastValueFrom(o$)).to.eq(1);
  });
});
