import {expect} from 'chai';
import {lastValueFrom, of} from 'rxjs';
import {innerMap} from './innerMap';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/innerMap', () => {
  it('Should output [2, 4, 6]', async () => {
    const o$ = of([1, 2, 3]).pipe(innerMap<number, number>(i => i * 2));
    expect(await lastValueFrom(o$)).to.deep.eq([2, 4, 6]);
  });

  it('Should apply thisArg', async () => {
    class Mapper {
      public readonly num = 2;

      public doMap(v: number): number {
        return v * this.num;
      }
    }

    const inst = new Mapper();
    const result = lastValueFrom(of([1, 2, 3]).pipe(innerMap(inst.doMap, inst)));

    expect(await result).to.deep.eq([2, 4, 6]);
  });
});
