import isObject = require('lodash/isObject');
import pick = require('lodash/pick');
import {OperatorFunction} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';

/**
 * Map to an object composed of the provided properties
 * @param props Properties to pick
 * @throws When the properties input is not an array
 * @returns {} if the source is not an object or the properties array is empty,
 * else an object composed of the provided properties
 * @see https://lodash.com/docs/#pick
 */
export function pickProps<I extends object, P extends keyof I>(props: P[]): OperatorFunction<I, Pick<I, P>>;
/**
 * Map to an object composed of the provided properties
 * @param props Properties to pick
 * @throws When the properties input is not an array
 * @returns {} if the source is not an object or the properties array is empty,
 * else an object composed of the provided properties
 * @see https://lodash.com/docs/#pick
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
