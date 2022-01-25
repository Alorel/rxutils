import type {MonoTypeOperatorFunction, ObservableInput} from 'rxjs';
import {switchMap} from 'rxjs';
import {switchMergeTap} from '../internal/switchMergeTap';

/**
 * Like <code>tap</code>, but asynchronous and uses <code>switchMap</code> internally.
 * @param tapper The tap function
 * @param thisArg An optional thisArg
 * @kind Operator
 * @since 2.1.0
 * @see https://rxjs.dev/api/operators/tap
 * @see https://rxjs.dev/api/operators/switchMap
 * @example
 * import {switchTap} from '@aloreljs/rxutils/operators';
 * import {take} from 'rxjs/operators';
 *
 * userLoggingIn$
 *   .pipe(
 *     // Only allow one user to be logging in at a time
 *     switchTap(userId => processAsynchronously(userId)),
 *     take(1)
 *   )
 *   .subscribe(userId => {
 *     console.log(userId, 'logged in');
 *   });
 */
export function switchTap<T>(tapper: (v: T) => ObservableInput<any>, thisArg?: any): MonoTypeOperatorFunction<T> {
  return switchMergeTap(switchMap, tapper, thisArg);
}
