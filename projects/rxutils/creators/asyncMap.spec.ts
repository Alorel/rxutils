import {expect} from 'chai';
import {noop} from 'lodash';
import type {Observable} from 'rxjs';
import {lastValueFrom, of, timer} from 'rxjs';
import {map, skip, take, tap} from 'rxjs/operators';
import {finaliseObserver} from '../util/finaliseObserver';
import type {asyncFilter} from './asyncFilter';
import {asyncMap} from './asyncMap';

/* eslint-disable @typescript-eslint/no-magic-numbers */

type Def = [string, any];
type Meth = typeof asyncMap | typeof asyncFilter;

const _tAsyncMapFilterCommon = {
  inpNotArray(meth: Meth): Def {
    return <Def>Object.freeze(['Should throw if input is not an array', (cb: any) => {
      let errored = false;
      let emitted = false;
      (meth as any)(1, noop)
        .pipe(
          tap({
            error: () => {
              errored = true;
            },
            next: () => {
              emitted = true;
            }
          })
        )
        .subscribe(finaliseObserver(() => {
          if (emitted) {
            cb(new Error('Emitted'));
          } else if (errored) {
            cb();
          } else {
            cb(new Error('Did not error'));
          }
        }));
    }]);
  },
  sameArray(meth: Meth): Def {
    return <Def>Object.freeze(['Should emit the same array if it\'s empty', async () => {
      const arr: any[] = [];

      const v = await lastValueFrom((meth as any)(arr, noop));
      expect(v).to.eq(arr);
    }]);
  }
};

Object.freeze(_tAsyncMapFilterCommon);
export {_tAsyncMapFilterCommon};

describe('creators/asyncMap', function () {
  it.apply(it, <any>_tAsyncMapFilterCommon.inpNotArray(asyncMap));
  it.apply(it, <any>_tAsyncMapFilterCommon.sameArray(asyncMap));

  describe('emitIntermediate', () => {
    function mapper(inp: number, idx: number): Observable<number> {
      return timer(0, 25).pipe(
        skip(1),
        take(3),
        map(v => inp * v * (idx + 1))
      );
    }

    const valueSpecs: Array<[boolean | undefined, number[], number | string]> = [
      [undefined, [3, 12, 27], 1],
      [true, [3, 12, 27], '3']
    ];
    valueSpecs.unshift([false, valueSpecs[0][1].slice(), 1]);

    for (const [emit, expArray, expEmissions] of valueSpecs) {
      const expEmissionsString = typeof expEmissions === 'string' ? `${expEmissions}+` : expEmissions.toString();

      describe(`When emitIntermediate is ${String(emit)}`, () => {
        let emissions: number;
        let out: number[];

        before('Run', cb => {
          emissions = 0;
          out = [];

          asyncMap([1, 2, 3], mapper, emit)
            .subscribe(
              v => {
                emissions++;
                out = v.slice(0);
              },
              cb,
              () => {
                cb();
              }
            );
        });

        it(`Should emit ${expEmissionsString} time(s)`, () => {
          const xp = expect(emissions).to;
          if (typeof expEmissions === 'number') {
            xp.eq(expEmissions);
          } else {
            xp.be.gte(parseFloat(expEmissions));
          }
        });

        it(`Should output [${expArray.join(', ')}]`, () => {
          expect(out).to.deep.eq(expArray);
        });
      });
    }
  });

  describe('thisArg', () => {
    class Mapper {
      public readonly num = 2;

      public map(v: number): Observable<number> {
        return of(v * this.num);
      }
    }

    let inst: Mapper;

    beforeEach(() => {
      inst = new Mapper();
    });

    it('Should apply thisArg', async () => {
      const o$ = asyncMap([1, 2, 3], inst.map, false, inst);
      expect(await lastValueFrom(o$)).to.deep.eq([2, 4, 6]);
    });
  });

  it('Should accept a promise input', async () => {
    const v$ = asyncMap([1, 2, 3], v => Promise.resolve(v * 2));
    expect(await lastValueFrom(v$)).to.deep.eq([2, 4, 6]);
  });

  it('Should observify filter method errors', () => {
    const msg = Math.random().toString();

    function mapper() {
      throw new Error(msg);
    }

    asyncMap<any, any>([1], <any>mapper);
  });
});
