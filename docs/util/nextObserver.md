# `Utility` nextObserver

## nextObserver\<T>(callback: (value: T) => void, thisArg?: any): [Observer](https://rxjs.dev/api/index/interface/Observer)\<T>

Creates an observer to be passed to .subscribe() calls that blackholes errors and completions. Useful
for instances where you handle/log errors as part of the pipeline, e.g. using the logError operator.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| callback | Handler for the next() observer | <span>(value: T) => void</span> | No |  |
| thisArg | Optional `this` argument to bind the callback to. | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 1.1.0*

**Example**:
```typescript
import {of} from 'rxjs';
import {nextObserver} from '@aloreljs/rxutils';

of(1).subscribe(nextObserver(v => {
  console.log('This is one', v);
}));
```

*Defined in [util/nextObserver.ts:18:28](https://github.com/Alorel/rxutils/blob/c21d2f7/src/util/nextObserver.ts#L18).*