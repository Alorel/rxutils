import {from, Observable, of} from 'rxjs';
import type {ObservifyInput} from '../types/ObservifyInput';

function isPromiseLike<T>(inp: any): inp is PromiseLike<T> {
  return typeof inp?.then === 'function';
}

/**
 * Turns the input into an observable if it isn't one already
 * @since 1.4
 * @kind Utility
 * @param inp The input
 * @example
 * import {of} from 'rxjs';
 * import {observify} from '@aloreljs/rxutils';
 *
 * observify(of(1)).subscribe(); // outputs 1
 * observify(Promise.resolve(2)).subscribe(); // outputs 2
 * observify(3).subscribe(); // outputs 3
 */
export function observify<T>(inp: ObservifyInput<T>): Observable<T> {
  if (inp instanceof Observable) {
    return inp;
  } else if (isPromiseLike<T>(inp)) {
    return from(inp);
  }

  return of(inp);
}
