/**
 * Callback for Array.prototype.reduce
 * @since 1.5
 */
export type ArrayReducer<I, O> = (accumulator: O, value: I, index: number, array: I[]) => O;
