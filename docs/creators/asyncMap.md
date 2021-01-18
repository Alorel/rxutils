# `Creator` asyncMap

## asyncMap\<I, O>(input: I[], mapper: (value: I, index: number, array: I[]) => [ObservableInput](https://rxjs.dev/api/index/type-alias/ObservableInput)\<O>, emitIntermediate?: boolean, thisArg?: any): [Observable](https://rxjs.dev/api/index/class/Observable)\<O[]>

Map the input array using the given asynchronous mapping function

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| input | The input array | <span>I[]</span> | No |  |
| mapper | The mapping function | <span>(value: I, index: number, array: I[]) => [ObservableInput](https://rxjs.dev/api/index/type-alias/ObservableInput)\<O></span> | No |  |
| emitIntermediate | When false (default), uses forkJoin to emit the output and therefore emits only once; When true, uses combineLatest and potentially emits more than once. | <span>boolean</span> | No | false |
| thisArg | thisArg to pass to Array.prototype.map | <span>any</span> | :heavy_check_mark: Yes |  |

**Returns**: An observable of mapped values

*Added in version 1.3.0*

**See**: https://rxjs.dev/api/index/function/combineLatest

**See**: https://rxjs.dev/api/index/function/forkJoin

**Example**:
```typescript
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {asyncMap} from '@aloreljs/rxutils';

of([1, 2, 3])
  .pipe(
    switchMap(arr => asyncMap(arr, val => of(val * 2)))
  )
  .subscribe();
// outputs [2, 4, 6]
```

*Defined in [creators/asyncMap.ts:28:24](https://github.com/Alorel/rxutils/blob/3fadbc6/src/creators/asyncMap.ts#L28).*