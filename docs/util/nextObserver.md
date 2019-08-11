# `Utility` nextObserver

## nextObserver\<T>(callback: (value: T) => void, thisArg?: any): [Observer](https://rxjs.dev/api/index/interface/Observer)\<T>

Creates an observer to be passed to .subscribe() calls that blackholes errors and completions. Useful
for instances where you handle/log errors as part of the pipeline, e.g. using the logError operator.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| callback | Handler for the next() observer | (value: T) => void | No |  |
| thisArg | Optional `this` argument to bind the callback to. | any | :heavy_check_mark: Yes |  |

**Example**:
```typescript
import {of} from 'rxjs';
import {nextObserver} from '@aloreljs/rxutils';

of(1).subscribe(nextObserver(v => {
  console.log('This is one', v);
}));
```

*Defined in [util/nextObserver.ts:17:28](https://github.com/Alorel/rxutils/blob/ca6c4c0/src/util/nextObserver.ts#L17).*