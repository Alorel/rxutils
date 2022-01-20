/**
 * Callback for Array.prototype.map or Array.prototype.filter
 * @since 1.0.0
 */
export type ArrayMapFn<I, O> = (item: I, index: number, array: I[]) => O;
