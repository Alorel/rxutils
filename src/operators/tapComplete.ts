import {MonoTypeOperatorFunction, noop} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * Shorthand for <code>tap(noop, noop, tapFunction)</code>
 * @param tapFn Tap function to execute when the source completes
 * @kind Operator
 * @see https://rxjs.dev/api/operators/tap
 * @example
 * import {of} from 'rxjs';
 * import {tap} from 'rxjs/operators';
 * import {tapComplete} from '@aloreljs/rxutils/operators';
 *
 * of('foo')
 *   .pipe(
 *     tap(() => console.log('next'), () => console.log('error'), () => console.log('complete')),
 *     tapComplete(() => console.log('definitely complete'))
 *   )
 *   .subscribe();
 * // Logs "complete" then "definitely complete"
 */
export function tapComplete<IO>(tapFn: () => void): MonoTypeOperatorFunction<IO> {
  return tap(noop, noop, tapFn);
}
