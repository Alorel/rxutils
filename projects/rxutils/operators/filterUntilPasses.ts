import {Observable} from 'rxjs';
import type {MonoTypeOperatorFunction, OperatorFunction} from 'rxjs';

/**
 * Act like rxjs' <code>filter</code> operator until the first time the predicate passes, then stop filtering and let
 * all emissions through
 * @param predicate The predicate function
 * @param thisArg Optional thisArg for the predicate function
 * @kind Operator
 * @since 2.1.0
 * @see https://rxjs.dev/api/operators/filter
 * @example
 * import {of} from 'rxjs';
 * import {filterUntilPasses} from '@aloreljs/rxutils/operators';
 *
 * of(1, 2, 3, 1, 2, 3)
 *   .pipe(
 *     filterUntilPasses(v => v >= 3)
 *   )
 *   .subscribe(console.log);
 * // Logs 3, 1, 2, 3
 */
export function filterUntilPasses<I>(predicate: (input: I) => any, thisArg?: any): MonoTypeOperatorFunction<I>;

/**
 * Act like rxjs' <code>filter</code> operator until the first time the predicate passes, then stop filtering and let
 * all emissions through
 * @param predicate The predicate function
 * @param thisArg Optional thisArg for the predicate function
 * @kind Operator
 * @since 2.1.0
 * @see https://rxjs.dev/api/operators/filter
 * @example
 * import {of} from 'rxjs';
 * import {filterUntilPasses} from '@aloreljs/rxutils/operators';
 *
 * of(1, 2, 3, 1, 2, 3)
 *   .pipe(
 *     filterUntilPasses(v => v >= 3)
 *   )
 *   .subscribe(console.log);
 * // Logs 3, 1, 2, 3
 */
export function filterUntilPasses<I, O>(predicate: (input: I) => any, thisArg?: any): OperatorFunction<I, O>;

export function filterUntilPasses<I, O = I>(predicate: (input: I) => any, thisArg?: any): OperatorFunction<I, O> {
  return function filterUntilPassesOuter(source) {
    return new Observable<O>(function filterUntilPassesInner(subscriber) {
      let filtering = true;

      return source.subscribe({
        complete: subscriber.complete.bind(subscriber),
        error: subscriber.error.bind(subscriber),
        next(value) {
          if (filtering) {
            // If predicate passes stop filtering & continue to emitting, else terminate early & don't emit
            if (predicate.call(thisArg, value)) {
              filtering = false;
            } else {
              return;
            }
          }

          subscriber.next(value as unknown as O);
        }
      });
    });
  };
}
