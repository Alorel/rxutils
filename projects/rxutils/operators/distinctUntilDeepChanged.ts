import {isEqual} from 'lodash';
import type {MonoTypeOperatorFunction} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

/**
 * {@link distinctUntilChanged} with lodash's isEqual as the comparator function.
 * Uses lodash in commonjs and lodash-es in es2015.
 * @since 1.0.0
 * @kind Operator
 * @see https://lodash.com/docs/#isEqual
 * @example
 * import {distinctUntilDeepChanged} from '@aloreljs/rxutils/operators';
 * import {of} from 'rxjs';
 *
 * of({a: 1}, {a: 1}, {a: 2}, {a: 1})
 *   .pipe(distinctUntilDeepChanged())
 *   .subscribe();
 * // Emits {a: 1}, {a: 2}, {a: 1}
 */
export function distinctUntilDeepChanged<I>(): MonoTypeOperatorFunction<I> {
  return distinctUntilChanged<I>(isEqual);
}
