import {expect} from 'chai';
import type {Observable} from 'rxjs';
import {lastValueFrom, of, timer} from 'rxjs';
import {mapTo, startWith} from 'rxjs/operators';
import {asyncFilter} from './asyncFilter';
import {_tAsyncMapFilterCommon} from './asyncMap.spec';

describe('creators/asyncFilter', function () {
  it.apply(it, <any>_tAsyncMapFilterCommon.inpNotArray(asyncFilter));
  it.apply(it, <any>_tAsyncMapFilterCommon.sameArray(asyncFilter));

  describe('emitIntermediate', () => {
    function filterer(inp: any): Observable<boolean> {
      return timer(25).pipe( // eslint-disable-line @typescript-eslint/no-magic-numbers
        mapTo(typeof inp === 'number'),
        startWith(true)
      );
    }

    type Spec = [boolean | undefined, any[], any[], number | string];
    const valueSpecs: Spec[] = [
      [undefined, [1, 'foo'], [1], 1],
      [false, [-1, 'bar'], [-1], 1],
      [true, [0, 'qux'], [0], '2']
    ];

    for (const [emit, inpArray, expArray, expEmissions] of valueSpecs) {
      const expEmissionsString = typeof expEmissions === 'string' ? `${expEmissions}+` : expEmissions.toString();

      describe(`When emitIntermediate is ${String(emit)}`, () => {
        let emissions: number;
        let out: any[];

        before('Run', cb => {
          emissions = 0;
          out = [];

          asyncFilter<any, any>(inpArray, filterer, emit)
            .subscribe({
              complete: cb,
              error: cb,
              next(v) {
                emissions++;
                out = v.slice(0);
              }
            });
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
    class Filterer {
      public readonly type = 'number';

      public filter(v: any): Observable<boolean> {
        return of(typeof v === this.type);
      }
    }

    let inst: Filterer;

    beforeEach(() => {
      inst = new Filterer();
    });

    it('Should apply thisArg', async () => {
      const o$ = asyncFilter<any, any>([1, {}], inst.filter, false, inst);

      expect(await lastValueFrom(o$)).to.deep.eq([1]);
    });
  });

  it('Should observify filter method errors', () => {
    const msg = Math.random().toString();

    function mapper() {
      throw new Error(msg);
    }

    asyncFilter<any, any>([1], <any>mapper);
  });
});
