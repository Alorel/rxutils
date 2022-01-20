import {InteropObservable, Observable} from 'rxjs';
import '../util/observify';

/**
 * Input for {@link observify}
 * @since 1.4
 */
export type ObservifyInput<T> = T | InteropObservable<T> | Observable<T> | PromiseLike<T>;
