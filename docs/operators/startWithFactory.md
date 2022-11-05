# `Operator` startWithFactory

## startWithFactory\<I, O>(factory: () => O, thisArg?: any): [OperatorFunction](https://rxjs.dev/api/index/interface/OperatorFunction)\<I, I | O>

Like startWith, but evaluates the initial value lazily

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| factory | The value function | <span>() => O</span> | No |  |
| thisArg | An optional thisArg | <span>any</span> | :heavy_check_mark: Yes |  |

*Added in version 2.1.0*

**See**: https://rxjs.dev/api/operators/startWith

**Example**:
```typescript
import {of} from 'rxjs';
import {startWithFactory} from '@aloreljs/rxutils/operators';

let starter = 'b';
const source = of('a').pipe(startWithFactory(() => starter));
source.subscribe(console.log); // "b", "a"
starter = 'c';
source.subscribe(console.log); // "c", "a"
```

*Defined in [operators/startWithFactory.ts:21:32](https://github.com/Alorel/rxutils/blob/93f4d1c/projects/rxutils/operators/startWithFactory.ts#L21).*