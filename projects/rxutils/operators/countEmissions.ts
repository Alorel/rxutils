import {Observable, type OperatorFunction} from 'rxjs';

/**
 * Counts how many times the source observable emits.
 * @since 1.0.0
 * @kind Operator
 * @param emitInitialZero If set to true, it will immediately emit 0 when subscribed to
 * @example
 * import {of} from 'rxjs';
 * import {countEmissions} from '@aloreljs/rxutils/operators';
 *
 * of('foo', 'bar', 'qux')
 *   .pipe(countEmissions())
 *   .subscribe() // emits 1, then 2, then 3 and completes
 */
export function countEmissions(emitInitialZero = false): OperatorFunction<any, number> {
  return function countEmissionsOperatorFn(source) {
    return new Observable<number>(function countEmissionsExecutor(subscriber) {
      let numEmissions = 0;
      if (emitInitialZero) {
        subscriber.next(numEmissions);
      }

      return source.subscribe({
        complete() {
          if (!emitInitialZero && !numEmissions) {
            subscriber.next(numEmissions);
          }
          subscriber.complete();
        },
        error: subscriber.error.bind(subscriber),
        next() {
          subscriber.next(++numEmissions);
        }
      });
    });
  };
}
