import {expect} from 'chai';
import {AsyncSubject, noop as rxNoop, of, Subject} from 'rxjs';
import {finaliseObserver} from '../../src';

//tslint:disable:no-identical-functions

describe('util/finaliseObserver', function () {
  it(`next should be an rxjs noop`, () => {
    expect(finaliseObserver(rxNoop).next).to.equal(rxNoop);
  });

  for (const m of ['complete', 'error']) {
    it(`Argument passed should get assigned to ${m}`, () => {
      function foo() {
        // noop
      }

      expect(finaliseObserver(foo)[m]).to.eq(foo);
    });
  }

  it('Shouldn\'t emit on next without a complete', () => {
    const src$ = new AsyncSubject<any>();
    let callCount = 0;
    src$.subscribe(finaliseObserver(() => {
      callCount++;
    }));
    expect(callCount).to.eq(0);
  });

  it('Should emit once on complete', () => {
    const src$ = new AsyncSubject<any>();
    let callCount = 0;
    src$.subscribe(finaliseObserver(() => {
      callCount++;
    }));
    src$.next(1);
    src$.next(2);
    src$.complete();
    expect(callCount).to.eq(1);
  });

  it('Should emit once on error', () => {
    const src$ = new Subject<any>();
    let callCount = 0;
    src$.subscribe(finaliseObserver(() => {
      callCount++;
    }));
    src$.next(1);
    src$.error(new Error('foo'));
    expect(callCount).to.eq(1);
  });

  describe('thisArg', () => {
    class Nextie {
      public readonly num = 1;

      public done(): void {
        result = (typeof this.num === 'number' ? this.num : 0) + 1;
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
            expect(result).to.equal(1);
            cb();
          } catch (e) {
            cb(e);
          }
        });
      of(null).subscribe(finaliseObserver(next.done));
    });

    it('Should bind if 2 arguments are passed', cb => {
      onComplete
        .subscribe(() => {
          try {
            expect(result).to.equal(2);
            cb();
          } catch (e) {
            cb(e);
          }
        });

      of(null).subscribe(finaliseObserver(next.done, next));
    });
  });
});
