import type {OperatorFunction} from 'rxjs';
import {mkArrayFilterOperator} from '../internal/mkArrayMapOperator';

/**
 * An rxjs map operator that performs Array.prototype.find on the input array.
 * @since 2.1.0
 * @kind Operator
 * @param findFn Callback for Array.prototype.map
 * @param thisArg What to bind the map function to; passed to Array.prototype.map
 * @example
 * import {of} from 'rxjs';
 * import {innerFind} from '@aloreljs/rxutils/operators';
 *
 * of(['a', 'b'])
 *   .pipe(innerFind(v => v === 'b'))
 *   .subscribe(console.log); // b
 *
 * of(['a', 'b'])
 *   .pipe(innerFind(v => v === 'c'))
 *   .subscribe(console.log); // undefined
 */
export function innerFind<I>(
  findFn: (v: I, index: number, array: I[]) => any,
  thisArg?: any
): OperatorFunction<I[], I | undefined> {
  return mkArrayFilterOperator(findFn, 'find', thisArg);
}
