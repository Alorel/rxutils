import type {OperatorFunction} from 'rxjs';
import {mkReduceOperator} from '../internal/innerReduceCommon';
import type {ArrayReducer} from '../types/ArrayReducer';

/**
 * An rxjs map operator that performs Array.prototype.reduce on the input array.
 * @kind Operator
 * @since 1.5.0
 * @param reducer Callback to Array.prototype.reduce
 * @param initialValue A function that returns the initial value for the reducer
 * @example
 * import {of} from 'rxjs';
 * import {innerReduce} from '@aloreljs/rxutils/operators';
 *
 * of([1, 2, 3, 4, 5])
 *   .pipe(
 *     innerReduce((acc, val, idx) => `${acc}|${val},${idx}`, () => '')
 *   )
 *   .subscribe(); // outputs |1,0|2,1|3,2|4,3|5,4
 *
 * of([1, 2, 3, 4, 5])
 *   .pipe(
 *     innerReduce((acc, val, idx) => `${acc}|${val},${idx}`)
 *   )
 *   .subscribe(); // outputs 1|2,1|3,2|4,3|5,4
 */
export function innerReduce<I, O>(reducer: ArrayReducer<I, O>, initialValue?: () => O): OperatorFunction<I[], O> {
  return mkReduceOperator('reduce', reducer, initialValue);
}
