import type {MonoTypeOperatorFunction, Observable, ObservableInput} from 'rxjs';
import {from} from 'rxjs';
import {last, map} from 'rxjs/operators';

/** @internal */
type MapOperator<T> = (callback: (value: T) => Observable<T>) => MonoTypeOperatorFunction<T>;

/** @internal */
export function switchMergeTap<T>(
  operator: MapOperator<T>,
  tapper: (value: T) => ObservableInput<any>,
  thisArg?: any
): MonoTypeOperatorFunction<T> {
  return operator(function switchMergeTapInner(value) {
    return from(tapper.call(thisArg, value)).pipe(
      last(null, null),
      map(() => value)
    );
  });
}
