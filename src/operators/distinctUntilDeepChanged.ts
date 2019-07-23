import isEqual = require('lodash/isEqual');
import {MonoTypeOperatorFunction} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

/**
 * {@link distinctUntilChanged} with lodash's isEqual as the comparator function.
 * Uses lodash in commonjs and lodash-es in es2015.
 * @see https://lodash.com/docs/#isEqual
 */
export function distinctUntilDeepChanged<I>(): MonoTypeOperatorFunction<I> {
  return distinctUntilChanged<I>(isEqual);
}
