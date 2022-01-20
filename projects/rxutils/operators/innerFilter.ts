import type {MonoTypeOperatorFunction, OperatorFunction} from 'rxjs';
import {mkArrayFilterOperator} from '../internal/mkArrayMapOperator';
import type {ArrayMapFn} from '../types/ArrayMapFn';

/**
 * An rxjs map operator that performs Array.prototype.filter on the input array.
 * @kind Operator
 * @param filterFn Callback for Array.prototype.filter
 * @param thisArg What to bind the filter function to; passed to Array.prototype.filter
 * @example
 * import {of} from 'rxjs';
 * import {innerFilter} from '@aloreljs/rxutils/operators';
 *
 * of([1, 2, 3])
 *   .pipe(innerFilter(num => num !== 2))
 *   .subscribe();
 * // outputs [1, 3]
 */
export function innerFilter<IO>(
  filterFn: (value: IO, index: number, array: IO[]) => boolean,
  thisArg?: any
): MonoTypeOperatorFunction<IO[]>;

/**
 * An rxjs map operator that performs Array.prototype.filter on the input array.
 * @kind Operator
 * @since 1.2.0
 * @param filterFn Callback for Array.prototype.filter
 * @param thisArg What to bind the filter function to; passed to Array.prototype.filter
 * @example
 * import {of} from 'rxjs';
 * import {innerFilter} from '@aloreljs/rxutils/operators';
 *
 * type Input = null | number;
 *
 * const numbers$: Observable<number[]> = of<Input[]>([1, null, 3])
 *   .pipe(innerFilter<Input, number>((num: Input): num is number => typeof num === 'number'));
 * numbers$.subscribe();
 * // outputs [1, 3]
 */
export function innerFilter<I, O extends I>(
  filterFn: (value: I, index: number, array: I[]) => value is O,
  thisArg?: any
): OperatorFunction<I[], O[]>;

export function innerFilter<I, O extends I>(
  filterFn: ArrayMapFn<I, boolean>,
  thisArg?: any
): OperatorFunction<I[], O[]> {
  return mkArrayFilterOperator(filterFn, 'filter', thisArg);
}
