import {Observable, ObservableInput} from 'rxjs';
import {asyncMapInternal} from '../internal/asyncMapInternal';

/**
 * Map the input array using the given asynchronous mapping function
 * @kind Creator
 * @since 1.3.0
 * @param input The input array
 * @param mapper The mapping function
 * @param emitIntermediate When false (default), uses forkJoin to emit the output and therefore emits only once;
 * When true, uses combineLatest and potentially emits more than once.
 * @param thisArg thisArg to pass to Array.prototype.map
 * @return An observable of mapped values
 * @see https://rxjs.dev/api/index/function/combineLatest
 * @see https://rxjs.dev/api/index/function/forkJoin
 * @example
 * import {of} from 'rxjs';
 * import {switchMap} from 'rxjs/operators';
 * import {asyncMap} from '@aloreljs/rxutils';
 *
 * of([1, 2, 3])
 *   .pipe(
 *     switchMap(arr => asyncMap(arr, val => of(val * 2)))
 *   )
 *   .subscribe();
 * // outputs [2, 4, 6]
 */
export function asyncMap<I, O>(
  input: I[],
  mapper: (value: I, index: number, array: I[]) => ObservableInput<O>,
  emitIntermediate = false,
  thisArg?: any
): Observable<O[]> {
  return asyncMapInternal<I, O>(input, mapper, emitIntermediate, thisArg, 'asyncMap');
}
