import type {MonoTypeOperatorFunction} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * Shorthand for <code>tap(noop, tapFunction)</code>
 * @since 1.0.0
 * @param tapFn The tap function accepting an error argument
 * @kind Operator
 * @see https://rxjs.dev/api/operators/tap
 * @example
 * import {throwError} from 'rxjs';
 * import {tap} from 'rxjs/operators';
 * import {tapError} from '@aloreljs/rxutils/operators';
 *
 * throwError(new Error('foo'))
 *   .pipe(
 *     tap(() => console.log('next'), () => console.log('error'), () => console.log('complete')),
 *     tapError(e => console.error(e)
 *   )
 *   .subscribe();
 * // Logs 'error', then the error object
 */
export function tapError<IO, E = Error>(tapFn: (e: E) => void): MonoTypeOperatorFunction<IO> {
  return tap({error: tapFn});
}
