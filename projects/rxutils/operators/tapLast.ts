import type {MonoTypeOperatorFunction} from 'rxjs';
import {Observable} from 'rxjs';

/**
 * Similar to <code>tap({complete: ...})</code>, but passes on the last emitted value to the callback
 * @param tapFn The callback function
 * @param thisArg An optional thisArg
 * @since 2.1.0
 * @kind Operator
 * @see https://rxjs.dev/api/operators/tap
 * @example
 * import {of} from 'rxjs';
 * import {tapLast} from '@aloreljs/rxutils/operators';
 *
 * of('foo', 'bar', 'qux')
 *   .pipe(
 *     tapLast(v => console.debug('tap', v))
 *   )
 *   .subscribe(v => {
 *     console.debug('subscribe', v);
 *   });
 * // Logs "subscribe foo", "subscribe bar", "subscribe qux", "tap qux"
 */
export function tapLast<T>(tapFn: (value?: T) => void, thisArg?: any): MonoTypeOperatorFunction<T> {
  return function tapLastOuter(source): Observable<T> {
    return new Observable<T>(function tapLastInner(subscriber) {
      let value: T | undefined;

      return source.subscribe({
        complete() {
          tapFn.call(thisArg, value);
          subscriber.complete();
        },
        error: subscriber.error.bind(subscriber),
        next(v) {
          value = v;
          subscriber.next(v);
        }
      });
    });
  };
}
