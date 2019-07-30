import {OperatorFunction, pipe} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {isTruthy} from '../internal/isTruthy';

/**
 * Shorthand for <code>source.pipe(filter(v => !!v), take(num))</code>
 * @kind Operator
 * @param numToTake Number of emissions to take. Passed on to rxjs' take() operator
 * @example
 * import {of} from 'rxjs';
 * import {takeTruthy} from '@aloreljs/rxutils/operators';
 *
 * of(false, true, 1, 0, 5, undefined, 'foo', null)
 *   .pipe(takeTruthy(3))
 *   .subscribe();
 * // outputs true, 1, 5
 */
export function takeTruthy<I, O extends I = I>(numToTake: number): OperatorFunction<I, O> {
  return pipe(
    filter<I, O>(<any>isTruthy),
    take<O>(numToTake)
  );
}
