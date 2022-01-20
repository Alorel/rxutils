import {expect} from 'chai';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {innerMap} from './innerMap';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/innerMap', () => {
  it('Should output [2, 4, 6]', async () => {
    await of([1, 2, 3])
      .pipe(
        innerMap<number, number>(i => i * 2),
        tap(ret => {
          expect(ret).to.deep.eq([2, 4, 6]);
        })
      )
      .toPromise();
  });

  it('Should apply thisArg', async () => {
    class Mapper {
      public readonly num = 2;

      public doMap(v: number): number {
        return v * this.num;
      }
    }

    const inst = new Mapper();
    const result = of([1, 2, 3])
      .pipe(innerMap(inst.doMap, inst))
      .toPromise();

    expect(await result).to.deep.eq([2, 4, 6]);
  });
});
