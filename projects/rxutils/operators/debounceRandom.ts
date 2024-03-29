import type {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {rng} from '../internal/rng';

/**
 * Same as the debounceTime operator, but debounces by a random duration
 * @since 1.0.0
 * @kind Operator
 * @param lower Minimum debounce duration
 * @param upper Maximum debounce duration
 * @example
 * import {debounceRandom} from '@aloreljs/rxutils/operators';
 *
 * getSomeObservable()
 *   .pipe(debounceRandom(100, 200))
 *   .subscribe();
 * // Works like debounceTime, but debounces by anywhere between 100 and 200ms every time
 */
export function debounceRandom<T>(lower: number, upper: number): MonoTypeOperatorFunction<T> {
  return switchMap((value: T): Observable<T> => (
    timer(rng(lower, upper))
      .pipe(map(() => value))
  ));
}
