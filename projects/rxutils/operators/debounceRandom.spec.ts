import {expect} from 'chai';
import {of, timer} from 'rxjs';
import {map, take, tap, toArray} from 'rxjs/operators';
import {debounceRandom} from './debounceRandom';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('operators/debounceRandom', function () {
  this.timeout(10000);
  let debounceTimes: number[], outValue: string[];

  before('Run', cb => {
    let start: number;
    debounceTimes = [];

    timer(0, 150)
      .pipe(
        tap(() => {
          start = Date.now();
        }),
        debounceRandom(50, 100),
        tap(() => {
          debounceTimes.push(Date.now() - start);
        }),
        take(5),
        map(v => v.toString()),
        toArray()
      )
      .subscribe({
        error: cb,
        next(oot) {
          outValue = oot;
          cb();
        }
      });
  });

  it('outValue should be [0, 1, 2, 3, 4]', () => {
    expect(outValue).to.deep.eq(['0', '1', '2', '3', '4']);
  });

  for (let i = 0; i < 5; i++) {
    it(`Debounce #${i + 1} should be >=50`, () => {
      expect(debounceTimes[i]).to.be.gte(50);
    });

    it(`Debounce #${i + 1} should be <=100`, () => {
      // Add a generous 10ms offset
      expect(debounceTimes[i]).to.be.lte(110);
    });
  }

  const errorTests: Array<[string, [any, any], any, string]> = [
    ['lower is NaN', ['1', 1], TypeError, 'Lower is not a number'],
    ['upper is NaN', [1, '1'], TypeError, 'Upper is not a number'],
    ['lower is < 0', [-1, 1], Error, 'Lower is < 0'],
    ['upper is < 0', [1, -1], Error, 'Upper is < 0'],
    ['upper < lower', [10, 5], Error, 'Upper is less than lower']
  ];

  for (const [name, [lower, upper], errConstructor, errMsg] of errorTests) {
    it(`Should throw if ${name}`, cb => {
      of(0).pipe(debounceRandom(lower, upper))
        .subscribe({
          error(e: Error) {
            try {
              expect(e).to.be.instanceOf(errConstructor);
              expect(e.message).to.equal(errMsg);
              cb();
            } catch (assertionError) {
              cb(assertionError);
            }
          },
          next() {
            cb(new Error('Did not throw'));
          }
        });
    });
  }
});
