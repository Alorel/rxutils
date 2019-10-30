import {OperatorFunction} from 'rxjs';
import {mkReduceOperator} from '../internal/innerReduceCommon';
import {ArrayReducer} from '../types/ArrayReducer';

/**
 * An rxjs map operator that performs Array.prototype.reduceRight on the input array.
 * @kind Operator
 * @since 1.5.0
 * @param reducer Callback to Array.prototype.reduceRight
 * @param initialValue A function that returns the initial value for the reducer
 * @example
 * import {of} from 'rxjs';
 * import {innerReduceRight} from '@aloreljs/rxutils/operators';
 *
 * of([1, 2, 3, 4, 5])
 *   .pipe(
 *     innerReduceRight((acc, val, idx) => `${acc}|${val},${idx}`, () => '')
 *   )
 *   .subscribe(); // outputs |5,4|4,3|3,2|2,1|1,0
 *
 * of([1, 2, 3, 4, 5])
 *   .pipe(
 *     innerReduceRight((acc, val, idx) => `${acc}|${val},${idx}`)
 *   )
 *   .subscribe(); // outputs 5|4,3|3,2|2,1|1,0
 */
export function innerReduceRight<I, O>(reducer: ArrayReducer<I, O>, initialValue?: () => O): OperatorFunction<I[], O> {
  return mkReduceOperator('reduceRight', reducer, initialValue);
}
