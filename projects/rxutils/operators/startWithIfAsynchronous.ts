import {Observable} from 'rxjs';
import type {OperatorFunction} from 'rxjs';

/**
 * Like <code>startWith</code>, but only emits if the source doesn't make its first emission synchronously
 * @param value Value to start with
 * @kind Operator
 * @since 2.1.0
 * @see https://rxjs.dev/api/operators/startWith
 * @example
 * import {asyncScheduler, of, scheduled} from 'rxjs';
 * import {startWithIfAsynchronous} from '@aloreljs/rxutils/operators';
 *
 * scheduled(of('b'), asyncScheduler)
 *   .pipe(startWithIfAsynchronous('a'))
 *   .subscribe(console.log); // "a", "b"
 *
 * of('b')
 *   .pipe(startWithIfAsynchronous('a'))
 *   .subscribe(console.log); // "b"
 */
export function startWithIfAsynchronous<I, O>(value: O): OperatorFunction<I, I | O> {
  return function startWithIfAsynchronousOuter(source) {
    return new Observable<I | O>(function startWithIfAsynchronousInner(subscriber) {
      let emitted = false;

      const sub = source.subscribe({
        complete: subscriber.complete.bind(subscriber),
        error: subscriber.error.bind(subscriber),
        next(v) {
          emitted = true;
          subscriber.next(v);
        }
      });

      if (!emitted) {
        subscriber.next(value);
      }

      return sub;
    });
  };
}
