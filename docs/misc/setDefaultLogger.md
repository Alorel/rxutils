# `Function` setDefaultLogger

## setDefaultLogger(logger: (...args: any[]) => void): (...args: any[]) => void

Sets the default logger used by the {@link logError} operator

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| logger | The new log function | <span>(...args: any[]) => void</span> | No |  |

**Returns**: The old default log function

**Example**:
```typescript
import {setDefaultLogger} from '@aloreljs/rxutils';
function myLogger(...args) {
  // noop
}

const initialLogger = setDefaultLogger(myLogger);
const logger2 = setDefaultLogger(console.error);

console.log(initialLogger === console.error); // true
console.log(logger2 === myLogger); // true
```

*Defined in [operators/logError.ts:63:32](https://github.com/Alorel/rxutils/blob/e14ca99/projects/rxutils/operators/logError.ts#L63).*