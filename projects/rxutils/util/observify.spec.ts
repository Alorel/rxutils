import {expect} from 'chai';
import {Test} from 'mocha';
import {InteropObservable, Observable, of} from 'rxjs';
import * as ZenObservable from 'zen-observable';
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

  describe('Interop observable', function () {
    let src: InteropObservable<number>;
    let num: number;
    let out: Observable<number>;

    before(() => {
      num = Math.random();
      src = <any>new ZenObservable<number>(sub => {
        sub.next(num);
        sub.complete();
      });
      out = observify(src);
      type T = [{ subscribe(cb: (v: number) => void): any }, string];

      for (const [ob, txt] of <T[]>[[src, 'Src'], [out, 'Output']]) {
        this.addTest(new Test(
          `${txt} should resolve to ${num}`,
          cb => {
            ob.subscribe(v => {
              try {
                expect(v).to.eq(num);
                cb();
              } catch (e) {
                cb(e);
              }
            });
          }
        ));
      }
    });

    it('Output should be instanceof rxjs Observable', () => {
      expect(out).to.be.instanceOf(Observable);
    });

    it('Should pass on error', cb => {
      const err = new Error('foo');
      const src$: InteropObservable<any> = <any>new ZenObservable<any>(sub => {
        sub.error(err);
      });

      observify(src$).toPromise()
        .then(
          () => cb(new Error('Did not throw')),
          createSubscriber(err, cb)
        );
    });
  });

  describe('Promise', function () {
    let num: number;
    let ob: Observable<number>;
    let resolved: number;

    before(cb => {
      this.addTest(new Test(`Should resolve to ${num = Math.random()}`, () => {
        expect(resolved).to.eq(num);
      }));

      (ob = observify(Promise.resolve(num))).subscribe(
        v => {
          resolved = v;
          cb();
        },
        cb
      );
    });

    it('Should be an instance of rxjs observable', () => {
      expect(ob).to.be.instanceOf(Observable);
    });

    it('Should pass on error', cb => {
      const err = new Error('foo');

      observify<any>(Promise.reject(err)).subscribe(
        () => cb(new Error('Did not throw')),
        createSubscriber(err, cb)
      );
    });
  });

  describe('Non-observable non-promise input', () => {
    it('Should resolve to input', () => {
      const inp: any = Symbol();

      return observify(inp).toPromise().then(r => {
        expect(r).to.eq(inp);
      });
    });

    it('Should return instance of rxjs observable', () => {
      expect(observify(1)).to.be.instanceOf(Observable);
    });
  });
});
