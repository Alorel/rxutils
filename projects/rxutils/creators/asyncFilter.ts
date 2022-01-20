import type {Observable, ObservableInput} from 'rxjs';
import {map} from 'rxjs/operators';
import {asyncMapInternal} from '../internal/asyncMapInternal';

function mapBooleans<I, O extends I>(input: I[], booleans: boolean[]): O[] {
  return input.filter<O>((_val: I, idx: number): _val is O => booleans[idx]);
}

/**
 * Filter the input array using the given asynchronous filter function
 * @kind Creator
 * @since 1.4.0
 * @param input The input array
 * @param filterer The filtering function
 * @param emitIntermediate When false (default), uses forkJoin to emit the output and therefore emits only once;
 * When true, uses combineLatest and potentially emits more than once.
 * @param thisArg thisArg to pass to Array.prototype.map
 * @return An observable of filtered values
 * @see https://rxjs.dev/api/index/function/combineLatest
 * @see https://rxjs.dev/api/index/function/forkJoin
 * @example
 * import {of} from 'rxjs';
 * import {switchMap} from 'rxjs/operators';
 * import {asyncFilter} from '@aloreljs/rxutils';
 *
 * of([1, 2, 3, 4, 5])
 *   .pipe(
 *     switchMap(arr => asyncFilter(arr, v => v >= 3))
 *   )
 *   .subscribe(); // outputs [3, 4, 5]
 */
export function asyncFilter<I, O extends I = I>(
  input: I[],
  filterer: (value: I, index: number, array: I[]) => ObservableInput<boolean>,
  emitIntermediate = false, // eslint-disable-line default-param-last
  thisArg?: any
): Observable<O[]> {
  return asyncMapInternal<I, boolean>(input, filterer, emitIntermediate, thisArg, 'asyncFilter').pipe(
    map(bools => bools === <any>input ? <O[]>input : mapBooleans<I, O>(input, bools))
  );
}
