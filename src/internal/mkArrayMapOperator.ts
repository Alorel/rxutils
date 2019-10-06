import {OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * @internal
 * @param userFn User provided filter/map fn
 * @param arrayFn Array.prototype fn to use
 * @param thisArg User provided thisArg
 */
export function mkArrayFilterOperator<I, O, K extends keyof I[]>(
  userFn: (...args: any[]) => any,
  arrayFn: K,
  thisArg?: any
): OperatorFunction<I[], O[]> {
  return map((arr: I[]): O[] => Array.prototype[arrayFn].call(arr, userFn, thisArg));
}
