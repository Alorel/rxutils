# innerMap
`Operator`

## innerMap\<I, O>(mapFn: [ArrayMapFn](https://github.com/Alorel/rxutils/blob/f3e643f/src/types/ArrayMapFn.ts#L2)\<I,O>, thisArg?: any): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I[], O[]>

An rxjs map operator that performs Array.prototype.map on the input array.
| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| mapFn | Callback for Array.prototype.map | [ArrayMapFn](https://github.com/Alorel/rxutils/blob/f3e643f/src/types/ArrayMapFn.ts#L2)\<I,O> | N |  |
| thisArg | What to bind the map function to; passed to Array.prototype.map | any | Y |  |

**Example**:
```typescript
import {of} from 'rxjs';
import {innerMap} from '@aloreljs/rxutils/operators';

of([1,2,3])
  .pipe(innerMap(num => num * 2))
  .subscribe();
// outputs [2, 4, 6]
```

*Defined in [operators/innerMap.ts:19:24](https://github.com/Alorel/rxutils/blob/f3e643f/src/operators/innerMap.ts#L19).*