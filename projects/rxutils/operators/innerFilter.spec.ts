import {expect} from 'chai';
import {noop} from 'lodash';
import type {Observable} from 'rxjs';
import {of} from 'rxjs';
import {innerFilter} from './innerFilter';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/innerFilter', function () {
  // BEGIN typechecks
  const _tcVal1: Observable<string[]> = of(['a', 'b']).pipe(
    innerFilter((val, idx, arr) => {
      noop(val.substr(0), idx.toExponential(), arr[0].substr(0));

      return true;
    })
  );
  type TCType1 = null | number;
  const _tcVal2: Observable<number[]> = of<TCType1[]>([1, 2, null]).pipe(
    innerFilter<TCType1, number>((val): val is number => typeof val === 'number')
  );
  noop(_tcVal1, _tcVal2);

  // END typechecks

  it('Should output [1, 4]', async () => {
    const result = await of([1, 0, 4, -1])
      .pipe(
        innerFilter(v => v > 0)
      )
      .toPromise();

    expect(result).to.deep.eq([1, 4]);
  });

  it('Should apply thisArg', async () => {
    class Filterer {
      public readonly num = 2;

      public doFilter(v: number): boolean {
        return v !== this.num;
      }
    }

    const inst = new Filterer();
    const result = of([1, 2, 3])
      .pipe(innerFilter(inst.doFilter, inst))
      .toPromise();

    expect(await result).to.deep.eq([1, 3]);
  });
});
