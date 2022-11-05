# `Operator` filterUntilPasses

## filterUntilPasses\<I>(predicate: (input: I) => any, thisArg?: any): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<I>

Act like rxjs' <code>filter</code> operator until the first time the predicate passes, then stop filtering and let
all emissions through

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| predicate | The predicate function | <span>(input: I) => any</span> | No |  |
| thisArg | Optional thisArg for the predicate function | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 2.1.0*

**See**: https://rxjs.dev/api/operators/filter

**Example**:
```typescript
import {of} from 'rxjs';
import {filterUntilPasses} from '@aloreljs/rxutils/operators';

of(1, 2, 3, 1, 2, 3)
  .pipe(
    filterUntilPasses(v => v >= 3)
  )
  .subscribe(console.log);
// Logs 3, 1, 2, 3
```

*Defined in [operators/filterUntilPasses.ts:23:33](https://github.com/Alorel/rxutils/blob/9057654/projects/rxutils/operators/filterUntilPasses.ts#L23).*
## filterUntilPasses\<I, O>(predicate: (input: I) => any, thisArg?: any): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I, O>

Act like rxjs' <code>filter</code> operator until the first time the predicate passes, then stop filtering and let
all emissions through

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| predicate | The predicate function | <span>(input: I) => any</span> | No |  |
| thisArg | Optional thisArg for the predicate function | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 2.1.0*

**See**: https://rxjs.dev/api/operators/filter

**Example**:
```typescript
import {of} from 'rxjs';
import {filterUntilPasses} from '@aloreljs/rxutils/operators';

of(1, 2, 3, 1, 2, 3)
  .pipe(
    filterUntilPasses(v => v >= 3)
  )
  .subscribe(console.log);
// Logs 3, 1, 2, 3
```

*Defined in [operators/filterUntilPasses.ts:44:33](https://github.com/Alorel/rxutils/blob/9057654/projects/rxutils/operators/filterUntilPasses.ts#L44).*