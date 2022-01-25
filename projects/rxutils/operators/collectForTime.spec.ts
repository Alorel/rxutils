import {expect} from 'chai';
import {delay, lastValueFrom, of} from 'rxjs';
import {startWith, toArray} from 'rxjs/operators';
import {collectForTime} from './collectForTime';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/collectForTime', function () {
  it('Base operation', async () => {
    const a$ = of(6).pipe(
      delay(5),
      startWith(5),
      delay(5),
      startWith(4),
      delay(25),
      startWith(3),
      delay(5),
      startWith(2),
      delay(5),
      startWith(1)
    );

    const v = await lastValueFrom(a$.pipe(collectForTime(20), toArray()));
    expect(v).to.deep.eq([
      [1, 2, 3],
      [4, 5, 6]
    ]);
  });

  it('Should emit leftovers on complete', async () => {
    const a$ = of('a').pipe(collectForTime(1000), toArray());
    expect(await lastValueFrom(a$)).to.deep.eq([['a']]);
  });
});
