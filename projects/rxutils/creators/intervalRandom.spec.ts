import {expect} from 'chai';
import {lastValueFrom} from 'rxjs';
import {last, take, tap, toArray} from 'rxjs/operators';
import {DummyScheduler, DummySchedulerAction} from '../_test-util/DummyScheduler';
import {intervalRandom} from './intervalRandom';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('creators/intervalRandom', function () {
  const errorTests: Array<[string, [any, any], any, string]> = [
    ['lower is NaN', ['1', 1], TypeError, 'Lower is not a number'],
    ['upper is NaN', [1, '1'], TypeError, 'Upper is not a number'],
    ['lower is < 0', [-1, 1], Error, 'Lower is < 0'],
    ['upper is < 0', [1, -1], Error, 'Upper is < 0'],
    ['upper < lower', [10, 5], Error, 'Upper is less than lower']
  ];

  for (const [name, [lower, upper], errConstructor, errMsg] of errorTests) {
    it(`Should throw if ${name}`, cb => {
      intervalRandom(lower, upper)
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

  it('Should return an array of iteration counters', async () => {
    const o$ = intervalRandom(1, 2)
      .pipe(
        take(3),
        toArray(),
        tap(out => {
          expect(out).to.deep.eq([0, 1, 2]);
        })
      );
    await lastValueFrom(o$);
  });

  describe('Should use specified scheduler', () => {
    beforeEach(() => {
      DummySchedulerAction.delays = [];
      DummySchedulerAction.scheduleCount = 0;
    });

    describe('With interval', () => {
      let delays: number[];

      before(cb => {
        intervalRandom(1, 1, new DummyScheduler())
          .pipe(
            take(3),
            last()
          )
          .subscribe({
            error: cb,
            next() {
              delays = DummySchedulerAction.delays.slice(0);
              cb();
            }
          });
      });

      it('Delays should be [1, 1, 1]', () => {
        expect(delays).to.deep.eq([1, 1, 1]);
      });
    });

    describe('With custom', () => {
      let delays: number[], count: number;

      before(cb => {
        intervalRandom(1, 5, new DummyScheduler())
          .pipe(
            take(3),
            last()
          )
          .subscribe({
            error: cb,
            next() {
              delays = DummySchedulerAction.delays.slice(0);
              count = DummySchedulerAction.scheduleCount;
              cb();
            }
          });
      });

      it('Count should be 3', () => {
        expect(count).to.equal(3);
      });

      for (let i = 0; i < 3; i++) {
        it(`Iteration ${i + 1} should have been delayed >=1 ms`, () => {
          expect(delays[i]).to.be.gte(1);
        });
        it(`Iteration ${i + 1} should have been delayed <=5 ms`, () => {
          expect(delays[i]).to.be.lte(5);
        });
      }
    });
  });
});
