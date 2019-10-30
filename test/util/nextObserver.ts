import {expect} from 'chai';
import {noop as rxNoop, of, Subject} from 'rxjs';
import {nextObserver} from '../../src';

//tslint:disable:no-identical-functions

describe('util/nextObserver', function () {
  for (const m of ['complete', 'error']) {
    it(`${m} should be an rxjs noop`, () => {
      expect(nextObserver(rxNoop)[m]).to.equal(rxNoop);
    });
  }

  it('Argument passed should get assigned to next()', () => {
    function foo() {
      // noop
    }

    expect(nextObserver(foo).next).to.equal(foo);
  });

  describe('thisArg', () => {
    class Nextie {
      public readonly num = 2;

      public next(v: number): void {
        result = v * ((this && this.num) || 1);
        onComplete.next();
      }
    }

    let next: Nextie;
    let onComplete: Subject<void>;
    let result: number;

    beforeEach(() => {
      next = new Nextie();
      onComplete = new Subject<void>();
      result = <any>null;
    });

    afterEach(() => {
      onComplete.complete();
    });

    it('Should not bind if 1 argument is passed', cb => {
      onComplete
        .subscribe(() => {
          try {
            expect(result).to.equal(5);
            cb();
          } catch (e) {
            cb(e);
          }
        });
      of(5).subscribe(nextObserver(next.next));
    });

    it('Should bind if 2 arguments are passed', cb => {
      onComplete
        .subscribe(() => {
          try {
            expect(result).to.equal(10);
            cb();
          } catch (e) {
            cb(e);
          }
        });

      of(5).subscribe(nextObserver(next.next, next));
    });
  });
});
