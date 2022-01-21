import type {Observable} from 'rxjs';

/**
 * Input for {@link observify}
 * @since 1.4
 */
export declare type ObservifyInput<T> = T | Observable<T> | PromiseLike<T>;
