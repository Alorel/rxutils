import type {Observer} from 'rxjs';
import {noop} from 'rxjs';

/**
 * Creates an observer to be passed to .subscribe() calls that blackholes errors and completions. Useful
 * for instances where you handle/log errors as part of the pipeline, e.g. using the logError operator.
 * @since 1.1.0
 * @kind Utility
 * @param callback Handler for the next() observer
 * @param thisArg Optional `this` argument to bind the callback to.
 * @example
 * import {of} from 'rxjs';
 * import {nextObserver} from '@aloreljs/rxutils';
 *
 * of(1).subscribe(nextObserver(v => {
 *   console.log('This is one', v);
 * }));
 */
export function nextObserver<T>(callback: (value: T) => void, thisArg?: any): Observer<T> {
  return {
    complete: noop,
    error: noop,
    next: arguments.length > 1 ? callback.bind(thisArg) : callback
  };
}
