import {expect} from 'chai';
import type {Observer} from 'rxjs';
import {Observable, of, throwError} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {nextSubscriber} from './nextSubscriber';

describe('util/nextSubscriber', () => {
  let nextCalls: string[];
  let errorCalls: string[];
  let completeCalls: number;

  before('Init', () => {
    nextCalls = [];
    errorCalls = [];
    completeCalls = 0;

    const observer: Observer<string> = {
      complete() {
        ++completeCalls;
      },
      error(e: Error) {
        errorCalls.push(e.message);
      },
      next(value) {
        nextCalls.push(value);
      }
    };

    new Observable<string>(subscriber => {
      throwError(() => new Error('e-foo'))
        .pipe(startWith('a'))
        .subscribe(nextSubscriber(subscriber, v => {
          subscriber.next(v.toUpperCase());
        }));
    }).subscribe(observer);

    new Observable<string>(subscriber => {
      of('b')
        .subscribe(nextSubscriber(subscriber, v => {
          subscriber.next(v.toUpperCase());
        }));
    }).subscribe(observer);
  });

  it('Should have 1 complete() call', () => {
    expect(completeCalls).to.eq(1);
  });

  it('Should have 2 error() call', () => {
    expect(errorCalls).to.deep.eq(['e-foo']);
  });

  it('Should have 2 next() calls', () => {
    expect(nextCalls).to.deep.eq(['A', 'B']);
  });
});
