# `Operator` innerReduce

## innerReduce\<I, O>(reducer: [ArrayReducer.d](https://github.com/Alorel/rxutils/blob/6924a2a/projects/rxutils/types/ArrayReducer.d.ts#L5)\<I,O>, initialValue?: () => O): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I[], O>

An rxjs map operator that performs Array.prototype.reduce on the input array.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| reducer | Callback to Array.prototype.reduce | <span>[ArrayReducer.d](https://github.com/Alorel/rxutils/blob/6924a2a/projects/rxutils/types/ArrayReducer.d.ts#L5)\<I,O></span> | No |  |
| initialValue | A function that returns the initial value for the reducer | <span>() => O</span> | :heavy_check_mark: Yes |  |

*Added in version 1.5.0*

**Example**:
```typescript
import {of} from 'rxjs';
import {innerReduce} from '@aloreljs/rxutils/operators';

of([1, 2, 3, 4, 5])
  .pipe(
    innerReduce((acc, val, idx) => `${acc}|${val},${idx}`, () => '')
  )
  .subscribe(); // outputs |1,0|2,1|3,2|4,3|5,4

of([1, 2, 3, 4, 5])
  .pipe(
    innerReduce((acc, val, idx) => `${acc}|${val},${idx}`)
  )
  .subscribe(); // outputs 1|2,1|3,2|4,3|5,4
```

*Defined in [operators/innerReduce.ts:27:27](https://github.com/Alorel/rxutils/blob/6924a2a/projects/rxutils/operators/innerReduce.ts#L27).*