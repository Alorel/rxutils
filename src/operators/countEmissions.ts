import {Observable, OperatorFunction} from 'rxjs';

/**
 * Counts how many times the source observable emits.
 * @param emitInitialZero If set to true, it will immediately emit 0 when subscribed to
 * @example
 * of('foo', 'bar', 'qux').pipe(countEmissions()).subscribe(...)
 * // emits 1, then 2, then 3 and completes
 */
export function countEmissions(emitInitialZero = false): OperatorFunction<any, number> {
  return source => {
    return new Observable<number>(subscriber => {
      let numEmissions = 0;
      if (emitInitialZero) {
        subscriber.next(0);
      }

      subscriber.add(source.subscribe(
        () => {
          subscriber.next(++numEmissions);
        },
        subscriber.error.bind(subscriber),
        subscriber.complete.bind(subscriber)
      ));
    });
  };
}
