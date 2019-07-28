/**
 * Random number generator
 * @internal
 * @param lower Lower bound
 * @param upper Upper bound
 * @throws If lower or upper are not numbers
 * @throws If lower > upper
 */
export function rng(lower: number, upper: number): number {
  validateRng(lower, upper);

  return lower === upper ? lower : lower + Math.floor(Math.random() * (upper - lower + 1));
}

/**
 * @internal
 * @throws If validation fails
 */
export function validateRng(lower: number, upper: number): void {
  if (typeof lower !== 'number') {
    throw new TypeError('Lower is not a number');
  } else if (typeof upper !== 'number') {
    throw new TypeError('Upper is not a number');
  } else if (lower < 0) {
    throw new Error('Lower is < 0');
  } else if (upper < 0) {
    throw new Error('Upper is < 0');
  } else if (upper < lower) {
    throw new Error('Upper is less than lower');
  }
}
