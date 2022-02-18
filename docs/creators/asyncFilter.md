# `Creator` asyncFilter

## asyncFilter\<I, O>(input: I[], filterer: (value: I, index: number, array: I[]) => [ObservableInput](https://rxjs.dev/api/index/type-alias/ObservableInput)\<boolean>, emitIntermediate?: boolean, thisArg?: any): [Observable](https://rxjs.dev/api/index/class/Observable)\<O[]>

Filter the input array using the given asynchronous filter function

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| input | The input array | <span>I[]</span> | No |  |
| filterer | The filtering function | <span>(value: I, index: number, array: I[]) => [ObservableInput](https://rxjs.dev/api/index/type-alias/ObservableInput)\<boolean></span> | No |  |
| emitIntermediate | When false (default), uses forkJoin to emit the output and therefore emits only once; When true, uses combineLatest and potentially emits more than once. | <span>boolean</span> | No | false |
| thisArg | thisArg to pass to Array.prototype.map | <span>any</span> | :heavy_check_mark: Yes |  |

**Returns**: An observable of filtered values

*Added in version 1.4.0*

**See**: https://rxjs.dev/api/index/function/combineLatest

**See**: https://rxjs.dev/api/index/function/forkJoin

**Example**:
```typescript
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {asyncFilter} from '@aloreljs/rxutils';

of([1, 2, 3, 4, 5])
  .pipe(
    switchMap(arr => asyncFilter(arr, v => v >= 3))
  )
  .subscribe(); // outputs [3, 4, 5]
```

*Defined in [creators/asyncFilter.ts:32:27](https://github.com/Alorel/rxutils/blob/6924a2a/projects/rxutils/creators/asyncFilter.ts#L32).*