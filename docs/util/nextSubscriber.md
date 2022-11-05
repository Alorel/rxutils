# `Utility` nextSubscriber

## nextSubscriber\<T>(subscriber: [Subscriber](https://rxjs.dev/api/index/class/Subscriber)\<T>, nextFn: (value: T) => void): [Observer](https://rxjs.dev/api/index/interface/Observer)\<T>

Creates an observer to be passed to `.subscribe()` calls inside a `new Observable(..)` callback that forwards
`complete` and `error` events, but lets you specify the `next` function

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| subscriber | The subscriber | <span>[Subscriber](https://rxjs.dev/api/index/class/Subscriber)\<T></span> | No |  |
| nextFn | Your `next` function | <span>(value: T) => void</span> | No |  |

*Added in version 2.2.0*

**Example**:
```typescript
import {Observable} from 'rxjs';
import {nextSubscriber} from '@aloreljs/rxutils';

const someSource$: Observable<any> = ...;

return new Observable<any>(subscriber => {
  doOnInitThings();
  const sub = someSource$.subscribe(nextSubscriber(value => {
    doThingsWith(value);
  }));
});
```

*Defined in [util/nextSubscriber.ts:23:30](https://github.com/Alorel/rxutils/blob/9057654/projects/rxutils/util/nextSubscriber.ts#L23).*