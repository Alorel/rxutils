import {expect} from 'chai';
import {lastValueFrom, of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {distinctWithInitial} from './distinctWithInitial';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/distinctWIthInitialPrimitive', () => {
  it('Should filter without args (1)', async () => {
    const src$ = of(0, 1, 1, 0).pipe(
      distinctWithInitial(0),
      toArray()
    );
    expect(await lastValueFrom(src$)).to.deep.eq([0, 1, 0]);
  });

  it('Should filter with args', async () => {
    type V = {v: number};
    const val = (v: number): V => ({v});

    const src$ = of(val(3), val(2), val(4), val(3)).pipe(
      distinctWithInitial<V, number>(val(1), (a, b) => a % 2 === b % 2, v => v.v),
      toArray()
    );

    expect(await lastValueFrom(src$)).to.deep.eq([
      val(1),
      val(2),
      val(3)
    ]);
  });
});
