import type {MonoTypeOperatorFunction, ObservableInput} from 'rxjs';
import {mergeMap} from 'rxjs';
import {switchMergeTap} from '../internal/switchMergeTap';

/**
 * Like <code>tap</code>, but asynchronous and uses <code>mergeMap</code> internally.
 * @param tapper The tap function
 * @param thisArg An optional thisArg
 * @kind Operator
 * @since 2.1.0
 * @see https://rxjs.dev/api/operators/tap
 * @see https://rxjs.dev/api/operators/mergeMap
 * @example
 * import {mergeTap} from '@aloreljs/rxutils/operators';
 *
 * userLoggingIn$
 *   .pipe(
 *     // Allow any number of users to be logging in at a time. Results may arrive out of order.
 *     mergeTap(userId => processAsynchronously(userId))
 *   )
 *   .subscribe(userId => {
 *     console.log(userId, 'logged in');
 *   });
 */
export function mergeTap<T>(tapper: (v: T) => ObservableInput<any>, thisArg?: any): MonoTypeOperatorFunction<T> {
  return switchMergeTap(mergeMap, tapper, thisArg);
}
