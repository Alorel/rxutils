# `Utility` nextComplete

## nextComplete\<T>(subj: [Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk)\<[Subject](https://rxjs.dev/api/index/class/Subject)\<T>, 'next' | 'complete'>, nextValue?: T): void

Shorthand for subject.next(value); subject.complete()

| **Parameter** | **Description** | **Type** | **Optional** | **Default value** |
|---------------|-----------------|----------|--------------|-------------------|
| subj | The subject to work with | <span>[Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk)\<[Subject](https://rxjs.dev/api/index/class/Subject)\<T>, 'next' &vert; 'complete'></span> | No |  |
| nextValue | An optional value to next() before completing the subject  | <span>T</span> | :heavy_check_mark: Yes |  |

*Added in version 1.5.0*

*Defined in [util/nextComplete.ts:10:28](https://github.com/Alorel/rxutils/blob/37f00a0/src/util/nextComplete.ts#L10).*