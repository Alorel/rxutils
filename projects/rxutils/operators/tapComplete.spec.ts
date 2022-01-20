import {expect} from 'chai';
import type {Observable} from 'rxjs';
import {of, throwError} from 'rxjs';
import {finalize, switchMap, tap} from 'rxjs/operators';
import {NOOP_OBSERVER} from '../util/NOOP_OBSERVER';
import {tapComplete} from './tapComplete';

describe('operators/tapComplete', () => {
  let nexts = 0,
    errors = 0,
    completions = 0;

  function resetCounters() {
    nexts = errors = completions = 0;
  }

  describe('Without errors', () => {
    after(resetCounters);

    before('Run', cb => {
      of('foo')
        .pipe(
          tap(
            () => {
              nexts++;
            },
            () => {
              errors++;
            },
            () => {
              completions++;
            }
          ),
          tapComplete(() => {
            completions++;
          }),
          finalize(() => cb())
        )
        .subscribe(NOOP_OBSERVER);
    });

    it('Should have 1 next', () => {
      expect(nexts).to.equal(1);
    });

    it('Should have 0 errors', () => {
      expect(errors).to.equal(0);
    });

    it('Should have 2 completions', () => {
      expect(completions).to.equal(2); // eslint-disable-line @typescript-eslint/no-magic-numbers
    });
  });

  describe('With errors', () => {
    after(resetCounters);

    before('Run', cb => {
      of('foo', '<err>')
        .pipe(
          switchMap((v: string): Observable<string> => {
            if (v === '<err>') {
              return throwError(() => new Error(v));
            }

            return of(v);
          }),
          tap({
            complete() {
              completions++;
            },
            error() {
              errors++;
            },
            next() {
              nexts++;
            }
          }),
          tapComplete(() => {
            completions++;
          }),
          finalize(() => cb())
        )
        .subscribe(NOOP_OBSERVER);
    });

    it('Should have 1 next', () => {
      expect(nexts).to.equal(1);
    });

    it('Should have 1 error', () => {
      expect(errors).to.equal(1);
    });

    it('Should have 0 completions', () => {
      expect(completions).to.equal(0);
    });
  });
});
