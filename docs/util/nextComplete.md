# `Utility` nextComplete

## nextComplete\<T>(subj: [Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk)\<[Subject](https://rxjs.dev/api/index/class/Subject)\<T>, 'next' | 'complete'>, nextValue?: T): void

Shorthand for subject.next(value); subject.complete()

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| subj | The subject to work with | <span>[Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk)\<[Subject](https://rxjs.dev/api/index/class/Subject)\<T>, 'next' &vert; 'complete'></span> | No |  |
| nextValue | An optional value to next() before completing the subject | <span>T</span> | :heavy_check_mark: Yes |  |

*Added in version 1.5.0*

**Example**:
```typescript
import {nextComplete} from '@aloreljs/rxutils';
import {Subject} from 'rxjs';

const subject1 = new Subject();
const subject2 = new Subject();

subject1.subscribe(
  v => console.log(`Next (1): ${v}`),
  console.error,
  () => console.log('Completed (1)')
);
subject2.subscribe(
  v => console.log(`Next (2): ${v}`),
  console.error,
  () => console.log('Completed (2)')
);
nextComplete(subject1);
nextComplete(subject2, 'foo');
// Output:
Next (1): undefined
Completed (1)
Next (2): foo
Completed (2)
```

*Defined in [util/nextComplete.ts:34:28](https://github.com/Alorel/rxutils/blob/7f8a5b2/projects/rxutils/util/nextComplete.ts#L34).*