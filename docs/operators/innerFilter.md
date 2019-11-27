# `Operator` innerFilter

## innerFilter\<IO>(filterFn: (value: IO, index: number, array: IO[]) => boolean, thisArg?: any): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<IO[]>

An rxjs map operator that performs Array.prototype.filter on the input array.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| filterFn | Callback for Array.prototype.filter | <span>(value: IO, index: number, array: IO[]) => boolean</span> | No |  |
| thisArg | What to bind the filter function to; passed to Array.prototype.filter | <span>any</span> | :heavy_check_mark: Yes |  |

**Example**:
```typescript
import {of} from 'rxjs';
import {innerFilter} from '@aloreljs/rxutils/operators';

of([1, 2, 3])
  .pipe(innerFilter(num => num !== 2))
  .subscribe();
// outputs [1, 3]
```

*Defined in [operators/innerFilter.ts:19:27](https://github.com/Alorel/rxutils/blob/c49eecf/src/operators/innerFilter.ts#L19).*
## innerFilter\<I, O>(filterFn: (value: I, index: number, array: I[]) => value, thisArg?: any): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I[], O[]>

An rxjs map operator that performs Array.prototype.filter on the input array.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| filterFn | Callback for Array.prototype.filter | <span>(value: I, index: number, array: I[]) => value</span> | No |  |
| thisArg | What to bind the filter function to; passed to Array.prototype.filter | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 1.2.0*

**Example**:
```typescript
import {of} from 'rxjs';
import {innerFilter} from '@aloreljs/rxutils/operators';

type Input = null | number;

const numbers$: Observable<number[]> = of<Input[]>([1, null, 3])
  .pipe(innerFilter<Input, number>((num: Input): num is number => typeof num === 'number'));
numbers$.subscribe();
// outputs [1, 3]
```

*Defined in [operators/innerFilter.ts:41:27](https://github.com/Alorel/rxutils/blob/c49eecf/src/operators/innerFilter.ts#L41).*