import {expect} from 'chai';
import {AsyncSubject, noop as rxNoop, of, Subject} from 'rxjs';
import {finaliseObserver} from './finaliseObserver';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('util/finaliseObserver', function () {
  it('next should be an rxjs noop', () => {
    expect(finaliseObserver(rxNoop).next).to.equal(rxNoop);
  });

  it('Argument passed should get assigned to complete', () => {
    function foo() {
      // noop
    }

    const o = finaliseObserver(foo);
    expect(o.complete).to.eq(foo, 'complete');
  });

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
    let next: Nextie;
    let onComplete: Subject<void>;
    let result: number;

    class Nextie {
      public readonly num = 1;

      public done(): void {
        result = (typeof (this.num as any) === 'number' ? this.num : 0) + 1;
        onComplete.next();
      }
    }

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
