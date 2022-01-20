import type {Observer} from 'rxjs';
import {noop} from 'rxjs';

/**
 * Creates an observer to be passed to .subscribe() that functions like the finalize() pipe - gets called when the
 * observable either completes or errors.
 * @since 1.6.0
 * @kind Utility
 * @param callback Handler for the next() observer
 * @param thisArg Optional `this` argument to bind the callback to.
 * @example
 * import {of, throwError} from 'rxjs';
 * import {finaliseObserver} from '@aloreljs/rxutils';
 *
 * of(1).subscribe(finaliseObserver(() => {
 *   console.log("I'll get called");
 * }));
 *
 * throwError(new Error('Some error')).subscribe(finaliseObserver(v => {
 *   console.log("I'll get called too");
 * }));
 */
export function finaliseObserver<T>(callback: () => void, thisArg?: any): Observer<T> {
  const fn = arguments.length > 1 ? callback.bind(thisArg) : callback;

  return {
    complete: fn,
    error: fn,
    next: noop
  };
}
