import type {MonoTypeOperatorFunction} from 'rxjs';
import {tapError} from './tapError';

const logged: unique symbol = Symbol('logged');
let defaultLoggerFactory: () => (...args: any[]) => void = () => console.error;

/**
 * Check if the given error was logged by the {@link logError} operator
 * @since 1.0.0
 * @param v Error to check
 * @returns True if the input is truthy and has been logged, false otherwise
 * @example
 * import {throwError, noop} from 'rxjs';
 * import {wasLogged} from '@aloreljs/rxutils';
 * import {logError, tapError} from '@aloreljs/rxutils/operators';
 *
 * throwError(new Error())
 *   .pipe(
 *     logError(),
 *     tapError(e => {
 *       console.log(wasLogged(e)); // true
 *     })
 *   )
 *   .subscribe(noop, noop);
 *
 * throwError(new Error())
 *   .pipe(
 *     tapError(e => {
 *       console.log(wasLogged(e)); // false
 *     })
 *   )
 *   .subscribe(noop, noop);
 *
 * throwError('foo')
 *   .pipe(
 *     logError(),
 *     tapError(e => {
 *       console.log(wasLogged(e)); // false
 *     })
 *   )
 *   .subscribe(noop, noop);
 */
export function wasLogged(v: any): boolean {
  return !!v && !!v[logged];
}

/**
 * Sets the default logger used by the {@link logError} operator
 * @param logger The new log function
 * @return The old default log function
 * @example
 * import {setDefaultLogger} from '@aloreljs/rxutils';
 * function myLogger(...args) {
 *   // noop
 * }
 *
 * const initialLogger = setDefaultLogger(myLogger);
 * const logger2 = setDefaultLogger(console.error);
 *
 * console.log(initialLogger === console.error); // true
 * console.log(logger2 === myLogger); // true
 */
export function setDefaultLogger(logger: (...args: any[]) => void): (...args: any[]) => void {
  const ret = defaultLoggerFactory();
  defaultLoggerFactory = () => logger;

  return ret;
}

function setLogged(err: any): void {
  if (err !== null && typeof err === 'object') {
    Object.defineProperty(err, logged, {
      configurable: false,
      enumerable: false,
      value: true,
      writable: false
    });
  }
}

/**
 * A tap() that logs errors. Non-null object errors will not be logged more than once.
 * @kind Operator
 * @param identifier An optional identifier for the logger. When provided, it'll be passed as the first argument
 * to the logger while the error will come second
 * @param logger Logger to use, defaults to console.error
 * @param loggerThisArg If using a custom logger, what to use for "this" when binding a the identifier
 * @example
 * import {logError} from '@aloreljs/rxutils/operators';
 * import {of, throwError, combineLatest} from 'rxjs';
 *
 * const source1 = throwError(new Error('err')).pipe(
 *   logError('[source 1 error]')
 * );
 * const source2 = of('foo');
 * const combined = combineLatest(source1, source2).pipe(
 *   logError('[combined error]')
 * );
 * combined.subscribe();
 * // Outputs [source 1 error] + error object for source 1's error
 * // Does not output [combined error] [...]
 */
export function logError<IO>(
  identifier?: any,
  logger: (...args: any[]) => void = defaultLoggerFactory(), // eslint-disable-line default-param-last
  loggerThisArg?: any
): MonoTypeOperatorFunction<IO> {
  let fn: any;
  if (identifier === undefined) {
    fn = loggerThisArg === undefined ? logger : logger.bind(loggerThisArg);
  } else {
    fn = logger.bind(loggerThisArg, identifier);
  }

  return tapError<IO>(err => {
    if (!wasLogged(err)) {
      setLogged(err);
      fn(err);
    }
  });
}
