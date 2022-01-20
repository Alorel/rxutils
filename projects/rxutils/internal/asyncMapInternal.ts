import type {Observable, ObservableInput} from 'rxjs';
import {combineLatest, forkJoin, of, throwError} from 'rxjs';

/** @internal */
export function asyncMapInternal<I, O>(
  input: I[],
  mapper: (value: I, index: number, array: I[]) => ObservableInput<O>,
  emitIntermediate: boolean,
  thisArg: any,
  validatorFnName: string
): Observable<O[]> {
  if (!Array.isArray(input)) {
    return throwError(() => new Error(`${validatorFnName} input not an array`));
  } else if (!input.length) {
    return of<any[]>(input);
  }

  let mapped: Array<ObservableInput<O>>;
  try {
    mapped = input.map(mapper, thisArg);
  } catch (e) {
    return throwError(() => e);
  }

  return <Observable<O[]>>(emitIntermediate ? combineLatest : forkJoin)(mapped);
}
