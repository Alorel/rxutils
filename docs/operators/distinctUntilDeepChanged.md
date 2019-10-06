# `Operator` distinctUntilDeepChanged

## distinctUntilDeepChanged\<I>(): [MonoTypeOperatorFunction](https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction)\<I>

{@link distinctUntilChanged} with lodash's isEqual as the comparator function.
Uses lodash in commonjs and lodash-es in es2015.

**See**: https://lodash.com/docs/#isEqual

**Example**:
```typescript
import {distinctUntilDeepChanged} from '@aloreljs/rxutils/operators';
import {of} from 'rxjs';

of({a: 1}, {a: 1}, {a: 2}, {a: 1})
  .pipe(distinctUntilDeepChanged())
  .subscribe();
// Emits {a: 1}, {a: 2}, {a: 1}
```

*Defined in [operators/distinctUntilDeepChanged.ts:19:40](https://github.com/Alorel/rxutils/blob/bc77141/src/operators/distinctUntilDeepChanged.ts#L19).*