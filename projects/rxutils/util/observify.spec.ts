import {expect} from 'chai';
import {Test} from 'mocha';
import {lastValueFrom, Observable, of} from 'rxjs';
import {observify} from './observify';

describe('util/observify', () => {
  it('Should pass through and return the same rxjs observable', () => {
    const src = of(1);
    const observified = observify(src);
    expect(src).to.eq(observified);
  });

  function createSubscriber<T>(exp: T, cb: any): (v: T) => void {
    return (v: T): void => {
      try {
        expect(v).to.eq(exp);
        cb();
      } catch (e) {
        cb(e);
      }
    };
  }

  describe('Promise', function () {
    let num: number;
    let ob: Observable<number>;
    let resolved: number;

    before(cb => {
      this.addTest(new Test(`Should resolve to ${num = Math.random()}`, () => {
        expect(resolved).to.eq(num);
      }));

      (ob = observify(Promise.resolve(num))).subscribe({
        error: cb,
        next(v) {
          resolved = v;
          cb();
        }
      });
    });

    it('Should be an instance of rxjs observable', () => {
      expect(ob).to.be.instanceOf(Observable);
    });

    it('Should pass on error', cb => {
      const err = new Error('foo');

      observify<any>(Promise.reject(err))
        .subscribe({
          error: createSubscriber(err, cb),
          next() {
            cb(new Error('Did not throw'));
          }
        });
    });
  });

  describe('Non-observable non-promise input', () => {
    it('Should resolve to input', async () => {
      const inp: any = Symbol('inp');

      expect(await lastValueFrom(observify(inp))).to.eq(inp);
    });

    it('Should return instance of rxjs observable', () => {
      expect(observify(1)).to.be.instanceOf(Observable);
    });
  });
});
