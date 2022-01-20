import {expect} from 'chai';
import {noop} from 'lodash';
import {of, throwError} from 'rxjs';
import {finalize, switchMap, tap} from 'rxjs/operators';
import {tapError} from './tapError';

describe('operators/tapError', () => {
  let nexts = 0,
    errors = 0,
    completions = 0,
    tappedError: Error = <any>null;

  before('Run', cb => {
    of('foo', 'err')
      .pipe(
        switchMap((v: any) => {
          if (v === 'err') {
            return throwError(new Error(v));
          }

          return of(v);
        }),
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
        tapError(e => {
          tappedError = <any>e;
          errors++;
        }),
        finalize(() => cb())
      )
      .subscribe(noop, noop, noop);
  });

  it('Should have 1 next', () => {
    expect(nexts).to.eq(1);
  });

  it('Should have 2 errors', () => {
    expect(errors).to.eq(2); // eslint-disable-line @typescript-eslint/no-magic-numbers
  });

  it('Should have 0 completions', () => {
    expect(completions).to.eq(0);
  });

  describe('tapped error', () => {
    it('Should exist', () => {
      expect(tappedError).to.not.eq(null);
    });

    it('Should have a message of "err"', () => {
      expect(tappedError.message).to.eq('err');
    });
  });
});
