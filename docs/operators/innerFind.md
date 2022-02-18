# `Operator` innerFind

## innerFind\<I>(findFn: (v: I, index: number, array: I[]) => any, thisArg?: any): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I[], I | undefined>

An rxjs map operator that performs Array.prototype.find on the input array.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| findFn | Callback for Array.prototype.map | <span>(v: I, index: number, array: I[]) => any</span> | No |  |
| thisArg | What to bind the map function to; passed to Array.prototype.map | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 2.1.0*

**Example**:
```typescript
import {of} from 'rxjs';
import {innerFind} from '@aloreljs/rxutils/operators';

of(['a', 'b'])
  .pipe(innerFind(v => v === 'b'))
  .subscribe(console.log); // b

of(['a', 'b'])
  .pipe(innerFind(v => v === 'c'))
  .subscribe(console.log); // undefined
```

*Defined in [operators/innerFind.ts:22:25](https://github.com/Alorel/rxutils/blob/6924a2a/projects/rxutils/operators/innerFind.ts#L22).*