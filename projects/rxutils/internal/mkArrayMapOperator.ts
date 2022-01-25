import type {OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

/** @internal */
type Accepted = 'map' | 'filter' | 'find';

/**
 * @internal
 * @param userFn User provided filter/map fn
 * @param arrayFn Array.prototype fn to use
 * @param thisArg User provided thisArg
 */
export function mkArrayFilterOperator<I>(
  userFn: (item: I, idx: number, array: I[]) => any,
  arrayFn: Accepted,
  thisArg?: any
): OperatorFunction<I[], any> {
  const protoFn = Array.prototype[arrayFn];

  return map((arr: I[]): any => protoFn.call(arr, userFn, thisArg));
}
