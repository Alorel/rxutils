import {expect} from 'chai';
import noop = require('lodash/noop');
import {Observable, of, timer} from 'rxjs';
import {finalize, map, skip, take, tap} from 'rxjs/operators';
import {asyncMap, NOOP_OBSERVER} from '../../src';

describe('creators/asyncMap', function () {
  it('Should throw if input is not an array', cb => {
    let errored = false;
    let emitted = false;
    asyncMap(<any>1, <any>noop)
      .pipe(
        tap(() => emitted = true, () => errored = true),
        finalize(() => {
          if (emitted) {
            cb(new Error('Emitted'));
          } else if (!errored) {
            cb(new Error('Did not error'));
          } else {
            cb();
          }
        })
      )
      .subscribe(NOOP_OBSERVER);
  });

  it('Should emit the same array if it\'s empty', async () => {
    const arr: any[] = [];
    const o$ = asyncMap(arr, <any>noop);
    expect(await o$.toPromise()).to.eq(arr);
  });

  describe('emitIntermediate', () => {
    function mapper(inp: number, idx: number): Observable<number> {
      return timer(0, 25).pipe(
        skip(1),
        take(3),
        map(v => inp * v * (idx + 1))
      );
    }

    const valueSpecs: [boolean | undefined, number[], number | string][] = [
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
      expect(await o$.toPromise()).to.deep.eq([2, 4, 6]);
    });
  });

  it('Should accept a promise input', async () => {
    const v$ = asyncMap([1, 2, 3], v => Promise.resolve(v * 2));
    expect(await v$.toPromise()).to.deep.eq([2, 4, 6]);
  });
});
