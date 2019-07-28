import {MonoTypeOperatorFunction, Observable, timer} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/operators';
import {rng} from '../internal/rng';

/**
 * Same as the debounceTime operator, but debounces by a random duration
 * @param lower Minimum debounce duration
 * @param upper Maximum debounce duration
 */
export function debounceRandom<T>(lower: number, upper: number): MonoTypeOperatorFunction<T> {
  return source => source.pipe(
    switchMap((value: T): Observable<T> => {
      return timer(rng(lower, upper)).pipe(mapTo(value));
    })
  );
}
