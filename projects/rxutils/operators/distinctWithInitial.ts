import type {MonoTypeOperatorFunction} from 'rxjs';
import {pipe} from 'rxjs';
import {distinctUntilChanged, startWith} from 'rxjs/operators';

/**
 * Shortcut alias for `pipe(startWith(initial), distinctUntilChanged())`
 * @param initial The initial value
 * @param comparator `distinctUntilChanged` comparator
 * @kind Operator
 * @since 2.3.0
 * @see https://rxjs.dev/api/operators/startWith
 * @see https://rxjs.dev/api/operators/distinctUntilChanged
 */
export function distinctWithInitial<T>(
  initial: T,
  comparator?: (previous: T, current: T) => boolean
): MonoTypeOperatorFunction<T>;

/**
 * Shortcut alias for `pipe(startWith(initial), distinctUntilChanged())`
 * @param initial The initial value
 * @param comparator `distinctUntilChanged` comparator
 * @param keySelector `distinctUntilChanged` key selector
 * @kind Operator
 * @since 2.3.0
 * @see https://rxjs.dev/api/operators/startWith
 * @see https://rxjs.dev/api/operators/distinctUntilChanged
 */
export function distinctWithInitial<T, K>(
  initial: T,
  comparator: (previous: K, current: K) => boolean,
  keySelector: (value: T) => K
): MonoTypeOperatorFunction<T>;

export function distinctWithInitial<T>(
  initial: T,
  ...untilChangedArgs: Parameters<typeof distinctUntilChanged<T>>
): MonoTypeOperatorFunction<T> {
  return pipe(
    startWith(initial),
    distinctUntilChanged(...untilChangedArgs)
  );
}
