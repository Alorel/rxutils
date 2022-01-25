import type {OperatorFunction} from 'rxjs';
import {debounceTime, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * Collect values until none have been emitted for the given duration then emit them as an array.
 * This differs from bufferTime operator as bufferTime will continue emitting even if the source hasn't emitted
 * during that time period.
 * @see https://rxjs.dev/api/operators/bufferTime
 * @param time The duration
 * @since 2.1.0
 * @kind Operator
 * @example
 * import {of} from 'rxjs';
 * import {delay, startWith, toArray} from 'rxjs/operators';
 * import {collectForTime} from '@aloreljs/rxutils/operators';
 *
 * // Read the observable pipeline from the bottom
 * const source$ = of(6) // then emit 6
 *    .pipe(
 *      delay(5), /// Then wait for 5 ms
 *      startWith(5), // Then emit 5
 *      delay(5), // Then wait for 5 ms
 *      startWith(4), // Then emit 4
 *      delay(25), // Then wait for 25 ms
 *      startWith(3), // Then emit 3
 *      delay(5), // Then wait for 5 ms
 *      startWith(2), // Then emit 2
 *      delay(5), // Then wait 5 ms
 *      startWith(1) // Emit 1
 *    );
 *
 *  source$
 *    .pipe(collectForTime(20), toArray())
 *    .subscribe(v => {
 *      console.log(v); // outputs [1, 2, 3] after around 30ms, then [4, 5, 6] after another 30 ish.
 *    });
 */
export function collectForTime<T>(time: number): OperatorFunction<T, T[]> {
  return function collectForTimeOuter(source) {
    return new Observable<T[]>(function collectForTimeInner(subscriber) {
      let collected: T[] = [];

      return source
        .pipe(

          // Immediately take note of the emission
          tap(v => {
            collected.push(v);
          }),
          debounceTime(time)
        )
        .subscribe({
          complete() {
            // Emit any leftovers if the source completed within {time} of the last emission
            if (collected.length) {
              subscriber.next(collected);
            }
            subscriber.complete();
          },
          error: subscriber.error.bind(subscriber),
          next() {
            const out = collected;
            collected = [];
            subscriber.next(out);
          }
        });
    });
  };
}
