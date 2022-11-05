# `Operator` mergeTap

## mergeTap\<T>(tapper: (v: T) => [ObservableInput](https://rxjs.dev/api/index/type-alias/ObservableInput)\<any>, thisArg?: any): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<T>

Like <code>tap</code>, but asynchronous and uses <code>mergeMap</code> internally.

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| tapper | The tap function | <span>(v: T) => [ObservableInput](https://rxjs.dev/api/index/type-alias/ObservableInput)\<any></span> | No |  |
| thisArg | An optional thisArg | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 2.1.0*

**See**: https://rxjs.dev/api/operators/tap

**See**: https://rxjs.dev/api/operators/mergeMap

**Example**:
```typescript
import {mergeTap} from '@aloreljs/rxutils/operators';

userLoggingIn$
  .pipe(
    // Allow any number of users to be logging in at a time. Results may arrive out of order.
    mergeTap(userId => processAsynchronously(userId))
  )
  .subscribe(userId => {
    console.log(userId, 'logged in');
  });
```

*Defined in [operators/mergeTap.ts:25:24](https://github.com/Alorel/rxutils/blob/9057654/projects/rxutils/operators/mergeTap.ts#L25).*