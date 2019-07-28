import {OperatorFunction, pipe} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {isTruthy} from '../internal/isTruthy';

/**
 * Shorthand for <code>source.pipe(filter(v => !!v), take(num))</code>
 * @param numToTake Number of emissions to take. Passed on to rxjs' take() operator
 */
export function takeTruthy<I, O extends I = I>(numToTake: number): OperatorFunction<I, O> {
  return pipe(
    filter<I, O>(<any>isTruthy),
    take<O>(numToTake)
  );
}
