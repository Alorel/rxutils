<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [Rx Utils](#rx-utils)
- [Installation](#installation)
- [Polyfills](#polyfills)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Rx Utils

Utility functions for rxjs

![Core](https://github.com/Alorel/rxutils/workflows/Core/badge.svg)

-----

A collection of utility functions for rxjs:

```typescript
import {of} from 'rxjs';
import {innerMap, logError, distinctUntilDeepChanged} from '@aloreljs/rxutils/operators';

of([1, 2, 3])
  .pipe(
    innerMap(n => n * 2),
    logError('[Inner map error]'),
    distinctUntilDeepChanged()
  )
  .subscribe();
```

Full API docs and examples for version 2.2.1 are available [here](https://github.com/Alorel/rxutils/tree/2.2.1/docs).
Docs and examples for the latest version are available [here](http://bit.ly/rxutils-master-docs).

# Installation
```
npm install rxjs@^7.0.0 @aloreljs/rxutils;
```

# Polyfills

Apart from your standard ES6 polyfills, you must ensure `Symbol`s are polyfilled.
