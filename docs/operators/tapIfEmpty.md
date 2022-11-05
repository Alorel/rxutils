# `Operator` tapIfEmpty

## tapIfEmpty\<T>(tapFn: () => void, thisArg?: any): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<T>

Call the provided tap function if the source completes without emitting anything

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| tapFn | The tap function | <span>() => void</span> | No |  |
| thisArg | An optional thisArg | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 2.1.0*

**See**: https://rxjs.dev/api/operators/tap

**Example**:
```typescript
import {of, EMPTY} from 'rxjs';
import {tapIfEmpty} from '@aloreljs/rxutils/operators';

let tapped = false;
EMPTY
  .pipe(tapIfEmpty(() => {
    tapped = true;
  }))
  .subscribe();
// tapped is true

tapped = false;
of(0)
  .pipe(tapIfEmpty(() => {
    tapped = true;
  }))
  .subscribe();
// tapped is false
```

*Defined in [operators/tapIfEmpty.ts:31:26](https://github.com/Alorel/rxutils/blob/9057654/projects/rxutils/operators/tapIfEmpty.ts#L31).*