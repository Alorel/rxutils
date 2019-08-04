import {OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';
import {ArrayMapFn} from '../types/ArrayMapFn';

/**
 * An rxjs map operator that performs Array.prototype.map on the input array.
 * @kind Operator
 * @param mapFn Callback for Array.prototype.map
 * @param thisArg What to bind the map function to; passed to Array.prototype.map
 * @example
 * import {of} from 'rxjs';
 * import {innerMap} from '@aloreljs/rxutils/operators';
 *
 * of([1,2,3])
 *   .pipe(innerMap(num => num * 2))
 *   .subscribe();
 * // outputs [2, 4, 6]
 */
export function innerMap<I, O>(mapFn: ArrayMapFn<I, O>, thisArg?: any): OperatorFunction<I[], O[]> {
  return map((inArray: I[]): O[] => inArray.map(mapFn, thisArg));
}
