# `Operator` innerReduceRight

## innerReduceRight\<I, O>(reducer: [ArrayReducer](https://github.com/Alorel/rxutils/blob/b6df7ef/src/types/ArrayReducer.ts#L5)\<I,O>, initialValue?: () => O): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I[], O>

An rxjs map operator that performs Array.prototype.reduceRight on the input array.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| reducer | Callback to Array.prototype.reduceRight | <span>[ArrayReducer](https://github.com/Alorel/rxutils/blob/b6df7ef/src/types/ArrayReducer.ts#L5)\<I,O></span> | No |  |
| initialValue | A function that returns the initial value for the reducer | <span>() => O</span> | :heavy_check_mark: Yes |  |

*Added in version 1.5.0*

**Example**:
```typescript
import {of} from 'rxjs';
import {innerReduceRight} from '@aloreljs/rxutils/operators';

of([1, 2, 3, 4, 5])
  .pipe(
    innerReduceRight((acc, val, idx) => `${acc}|${val},${idx}`, () => '')
  )
  .subscribe(); // outputs |5,4|4,3|3,2|2,1|1,0

of([1, 2, 3, 4, 5])
  .pipe(
    innerReduceRight((acc, val, idx) => `${acc}|${val},${idx}`)
  )
  .subscribe(); // outputs 5|4,3|3,2|2,1|1,0
```

*Defined in [operators/innerReduceRight.ts:27:32](https://github.com/Alorel/rxutils/blob/b6df7ef/src/operators/innerReduceRight.ts#L27).*