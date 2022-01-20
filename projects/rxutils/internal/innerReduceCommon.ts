import type {OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';
import type {ArrayReducer} from '../types/ArrayReducer';

/** @internal */
export function mkReduceOperator<I, O>(
  method: 'reduce' | 'reduceRight',
  reducer: ArrayReducer<I, O>,
  initialValue?: () => O
): OperatorFunction<I[], O> {
  const callable: Function = Array.prototype[method];

  const fn: (arr: I[]) => O = initialValue ?
    arr => callable.call(arr, <any>reducer, initialValue()) :
    arr => callable.call(arr, <any>reducer);

  return map(fn);
}
