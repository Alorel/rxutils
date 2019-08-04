/** Callback for Array.prototype.map */
export type ArrayMapFn<I, O> = (item: I, index: number, array: I[]) => O;
