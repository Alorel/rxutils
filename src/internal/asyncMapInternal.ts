import {combineLatest, forkJoin, Observable, ObservableInput, of, throwError} from 'rxjs';

/** @internal */
export function asyncMapInternal<I, O>(
  input: I[],
  mapper: (value: I, index: number, array: I[]) => ObservableInput<O>,
  emitIntermediate: boolean,
  thisArg: any,
  validatorFnName: string
): Observable<O[]> {
  if (!Array.isArray(<any>input)) {
    return throwError(new Error(`${validatorFnName} input not an array`));
  } else if (!input.length) {
    return of<any[]>(input);
  }

  let mapped: ObservableInput<O>[];
  try {
    mapped = input.map(mapper, thisArg);
  } catch (e) {
    return throwError(e);
  }

  // Tslint error is a false positive
  //tslint:disable-next-line:deprecation
  return (<Observable<O[]>>(emitIntermediate ? combineLatest : forkJoin).call(null, mapped));
}
