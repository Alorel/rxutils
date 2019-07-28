import {Observable, OperatorFunction, Subscriber} from 'rxjs';

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
      handler(source, subscriber, emitInitialZero);
    });
  };
}

function handler(source: Observable<any>, subscriber: Subscriber<number>, emitInitialZero: boolean): void {
  let numEmissions = 0;
  if (emitInitialZero) {
    subscriber.next(0);
  }

  subscriber.add(
    source.subscribe(
      () => {
        subscriber.next(++numEmissions);
      },
      err => {
        subscriber.error(err);
      },
      () => {
        subscriber.complete();
      }
    )
  );
}
