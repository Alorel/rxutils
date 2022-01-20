import type {OperatorFunction} from 'rxjs';
import {pipe} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {isFalsy} from '../internal/isFalsy';

/**
 * Shorthand for <code>source.pipe(filter(v => !v), take(num))</code>
 * @since 1.0.0
 * @kind Operator
 * @param numToTake Number of emissions to take. Passed on to rxjs' take() operator
 * @example
 * import {of} from 'rxjs';
 * import {takeFalsy} from '@aloreljs/rxutils/operators';
 *
 * of(false, true, 1, 0, 5, undefined, 'foo', null)
 *   .pipe(takeFalsy(3))
 *   .subscribe();
 * // outputs false, 0, undefined
 */
export function takeFalsy<I, O extends I = I>(numToTake: number): OperatorFunction<I, O> {
  return pipe(
    filter<I, O>(<any>isFalsy),
    take<O>(numToTake)
  );
}
