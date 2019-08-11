import {noop, Observer} from 'rxjs';

/**
 * A no-op observer to be passed to .subscribe() calls when you do your logic and/or error handling inside the
 * observable pipeline.
 * @kind Utility
 * @example
 * import {of} from 'rxjs';
 * import {NOOP_OBSERVER} from '@aloreljs/rxutils';
 *
 * of(1).subscribe(NOOP_OBSERVER);
 */
export const NOOP_OBSERVER: Readonly<Observer<any>> = Object.freeze({
  complete: noop,
  error: noop,
  next: noop
});
