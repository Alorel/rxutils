import type {OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * @internal
 * @param userFn User provided filter/map fn
 * @param arrayFn Array.prototype fn to use
 * @param thisArg User provided thisArg
 */
export function mkArrayFilterOperator<I, O>(
  userFn: (item: I, idx: number, array: I[]) => any,
  arrayFn: 'map' | 'filter',
  thisArg?: any
): OperatorFunction<I[], O[]> {
  const protoFn = Array.prototype[arrayFn];

  return map((arr: I[]): O[] => protoFn.call(arr, userFn, thisArg));
}
