import type {MonoTypeOperatorFunction} from 'rxjs';
import {Observable} from 'rxjs';

/**
 * Call the provided tap function if the source completes without emitting anything
 * @param tapFn The tap function
 * @param thisArg An optional thisArg
 * @kind Operator
 * @since 2.1.0
 * @see https://rxjs.dev/api/operators/tap
 * @example
 * import {of, EMPTY} from 'rxjs';
 * import {tapIfEmpty} from '@aloreljs/rxutils/operators';
 *
 * let tapped = false;
 * EMPTY
 *   .pipe(tapIfEmpty(() => {
 *     tapped = true;
 *   }))
 *   .subscribe();
 * // tapped is true
 *
 * tapped = false;
 * of(0)
 *   .pipe(tapIfEmpty(() => {
 *     tapped = true;
 *   }))
 *   .subscribe();
 * // tapped is false
 */
export function tapIfEmpty<T>(tapFn: () => void, thisArg?: any): MonoTypeOperatorFunction<T> {
  return function tapIfEmptyOuter(source) {
    return new Observable<T>(function tapIfEmptyInner(subscriber) {
      let emitted = false;

      return source.subscribe({
        complete() {
          if (!emitted) {
            tapFn.call(thisArg);
          }
          subscriber.complete();
        },
        error: subscriber.error.bind(subscriber),
        next(v) {
          emitted = true;
          subscriber.next(v);
        }
      });
    });
  };
}
