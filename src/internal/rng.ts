/**
 * Random number generator
 * @inhernal
 * @param lower Lower bound
 * @param upper Upper bound
 * @throws If lower or upper are not numbers
 * @throws If lower > upper
 */
export function rng(lower: number, upper: number): number {
  if (typeof lower !== 'number') {
    throw new TypeError('Lower is not a number');
  } else if (typeof upper !== 'number') {
    throw new TypeError('Upper is not a number');
  } else if (lower > upper) {
    throw new Error('Lower bound is greater than upper bound');
  } else if (lower === upper) {
    return lower;
  } else {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
  }
}
