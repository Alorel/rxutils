import {OperatorFunction, pipe} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {isFalsy} from '../internal/isFalsy';

/**
 * Shorthand for <code>source.pipe(filter(v => !v), take(num))</code>
 * @param numToTake Number of emissions to take. Passed on to rxjs' take() operator
 */
export function takeFalsy<I, O extends I = I>(numToTake: number): OperatorFunction<I, O> {
  return pipe(
    filter<I, O>(<any>isFalsy),
    take<O>(numToTake)
  );
}
