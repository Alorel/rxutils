import isObject = require('lodash/isObject');
import pick = require('lodash/pick');
import {OperatorFunction} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';

/**
 * Map to an object composed of the provided properties. Uses lodash's pick function and therefore accepts deep
 * property paths
 * @kind Operator
 * @param props Properties to pick
 * @throws When the properties input is not an array
 * @returns An empty object if the source is not an object or the properties array is empty,
 * else an object composed of the provided properties, if they exist on the object.
 * @see https://lodash.com/docs/#pick
 * @example
 * import {of} from 'rxjs';
 * import {pickProps} from '@aloreljs/rxutils/operators';
 *
 * const obj = {
 *   foo: {
 *     bar: 1,
 *     qux: 2
 *   },
 *   baz: 3,
 *   bux: 4
 * };
 *
 * of(obj)
 *   .pipe(pickProps(['foo.bar', 'baz']))
 *   .subscribe();
 * // outputs {foo: {bar: 1}, baz: 3}
 */
export function pickProps<I extends object, P extends keyof I>(props: P[]): OperatorFunction<I, Pick<I, P>>;
/**
 * Map to an object composed of the provided properties. Uses lodash's pick function and therefore accepts deep
 * property paths
 * @kind Operator
 * @param props Properties to pick
 * @throws When the properties input is not an array
 * @returns An empty object if the source is not an object or the properties array is empty,
 * else an object composed of the provided properties, if they exist on the object.
 * @see https://lodash.com/docs/#pick
 * @example
 * import {of} from 'rxjs';
 * import {pickProps} from '@aloreljs/rxutils/operators';
 *
 * const obj = {
 *   foo: {
 *     bar: 1,
 *     qux: 2
 *   },
 *   baz: 3,
 *   bux: 4
 * };
 *
 * of(obj)
 *   .pipe(pickProps(['foo.bar', 'baz']))
 *   .subscribe();
 * // outputs {foo: {bar: 1}, baz: 3}
 */
export function pickProps<I extends object, O = any>(props: PropertyKey[]): OperatorFunction<I, O>;
export function pickProps<I extends object, O>(props: PropertyKey[]): OperatorFunction<I, O> {
  if (!Array.isArray(props)) {
    throw new TypeError('Picked properties must be an array');
  } else if (!props.length) {
    return mapTo<any, any>({});
  } else {
    return map((obj: I): any => isObject(obj) ? pick(obj, props) : {});
  }
}
