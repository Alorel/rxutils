import type {Observer, Subscriber} from 'rxjs';

/**
 * Creates an observer to be passed to `.subscribe()` calls inside a `new Observable(..)` callback that forwards
 * `complete` and `error` events, but lets you specify the `next` function
 * @since 2.2.0
 * @kind Utility
 * @param subscriber The subscriber
 * @param nextFn Your `next` function
 * @example
 * import {Observable} from 'rxjs';
 * import {nextSubscriber} from '@aloreljs/rxutils';
 *
 * const someSource$: Observable<any> = ...;
 *
 * return new Observable<any>(subscriber => {
 *   doOnInitThings();
 *   const sub = someSource$.subscribe(nextSubscriber(value => {
 *     doThingsWith(value);
 *   }));
 * });
 */
export function nextSubscriber<T>(subscriber: Subscriber<T>, nextFn: (value: T) => void): Observer<T> {
  return {
    complete: subscriber.complete.bind(subscriber),
    error: subscriber.error.bind(subscriber),
    next: nextFn
  };
}
