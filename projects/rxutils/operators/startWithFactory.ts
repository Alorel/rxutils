import type {OperatorFunction} from 'rxjs';
import {Observable} from 'rxjs';

/**
 * Like startWith, but evaluates the initial value lazily
 * @param factory The value function
 * @param thisArg An optional thisArg
 * @kind Operator
 * @since 2.1.0
 * @see https://rxjs.dev/api/operators/startWith
 * @example
 * import {of} from 'rxjs';
 * import {startWithFactory} from '@aloreljs/rxutils/operators';
 *
 * let starter = 'b';
 * const source = of('a').pipe(startWithFactory(() => starter));
 * source.subscribe(console.log); // "b", "a"
 * starter = 'c';
 * source.subscribe(console.log); // "c", "a"
 */
export function startWithFactory<I, O>(factory: () => O, thisArg?: any): OperatorFunction<I, I | O> {
  return function startWithFactoryOuter(source) {
    return new Observable<I | O>(function startWithFactoryInner(subscriber) {
      subscriber.next(factory.call(thisArg));

      return source.subscribe(subscriber);
    });
  };
}
