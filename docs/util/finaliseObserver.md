# `Utility` finaliseObserver

## finaliseObserver\<T>(callback: () => void, thisArg?: any): [Observer](https://rxjs.dev/api/index/interface/Observer)\<T>

Creates an observer to be passed to .subscribe() that functions like the finalize() pipe - gets called when the
observable either completes or errors.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| callback | Handler for the next() observer | <span>() => void</span> | No |  |
| thisArg | Optional `this` argument to bind the callback to. | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 1.6.0*

**Example**:
```typescript
import {of, throwError} from 'rxjs';
import {finaliseObserver} from '@aloreljs/rxutils';

of(1).subscribe(finaliseObserver(() => {
  console.log("I'll get called");
}));

throwError(new Error('Some error')).subscribe(finaliseObserver(v => {
  console.log("I'll get called too");
}));
```

*Defined in [util/finaliseObserver.ts:23:32](https://github.com/Alorel/rxutils/blob/0ae56ba/projects/rxutils/util/finaliseObserver.ts#L23).*