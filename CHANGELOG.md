## [2.2.1](https://github.com/Alorel/rxutils/compare/2.2.0...2.2.1) (2022-11-05)


### Bug Fixes

* Fix lodash being used instead of lodash-es in ESM builds ([93f4d1c](https://github.com/Alorel/rxutils/commit/93f4d1c28223ba045f81f8882477e2bfa2673cd0))


### Maintenance

* Fix deprecated code usages ([6aa2c9a](https://github.com/Alorel/rxutils/commit/6aa2c9aec35e45c236e012ef3ec56c839e32ca8d))
* Update dev dependencies ([b28a546](https://github.com/Alorel/rxutils/commit/b28a5461157c8f3523bea0ae694f139baf1ee97b))


### Tests

* Remove deprecated code usages in tests ([e55c4d8](https://github.com/Alorel/rxutils/commit/e55c4d81aec351acf95929f226b58ac2d66dc7e0))

# [2.2.0](https://github.com/Alorel/rxutils/compare/2.1.0...2.2.0) (2022-02-18)


### Features

* Add nextSubscriber util fn ([6924a2a](https://github.com/Alorel/rxutils/commit/6924a2a3483c01e03be06577c56d0a2614ad109a))

# [2.1.0](https://github.com/Alorel/rxutils/compare/2.0.2...2.1.0) (2022-01-25)


### Documentation

* **tapError:** Stop using the deprecated tap syntax in example code ([f621433](https://github.com/Alorel/rxutils/commit/f6214335e449029143c433e7239557e5e46443a0))


### Features

* **operators:** Add collectForTime operator ([24fb9a6](https://github.com/Alorel/rxutils/commit/24fb9a656c0a51404ea4d6628df698f646e7ce62))
* **operators:** Add filterUntilPasses operator ([9ec97a8](https://github.com/Alorel/rxutils/commit/9ec97a882f76e47900345aa79cad06d263d1c154))
* **operators:** Add innerFind operator ([7f8a5b2](https://github.com/Alorel/rxutils/commit/7f8a5b2b792c30d257078983c1dfc6b7208ea61b))
* **operators:** Add startWithFactory operator ([d962d63](https://github.com/Alorel/rxutils/commit/d962d63668e5e6d6e9f8e8f7175fbe920d336781))
* **operators:** Add startWithIfAsynchronous operator ([a47622f](https://github.com/Alorel/rxutils/commit/a47622f23a9f4ef61bfc1a21eca64f75276d946a))
* **operators:** Add switchTap & mergeTap operators ([1745bea](https://github.com/Alorel/rxutils/commit/1745bea8dd0a45c7c0be6f0aa17dfa4a9968462c))
* **operators:** Add tapIfEmpty operator ([e0e10ea](https://github.com/Alorel/rxutils/commit/e0e10eacd41999b29a018504a7319ab034639ac1))
* **operators:** Add tapLast operator ([cad1392](https://github.com/Alorel/rxutils/commit/cad139232ee4f3701de3e2fdd925bd4bf8a2382c))

## [2.0.2](https://github.com/Alorel/rxutils/compare/2.0.1...2.0.2) (2022-01-21)


### Bug Fixes

* Fix ./types not being packaged ([425f1cf](https://github.com/Alorel/rxutils/commit/425f1cfdae1ea6c8040fdd1f2731c2cea6bb519f))


### Maintenance

* Update deps ([f26df06](https://github.com/Alorel/rxutils/commit/f26df068b5f919f1c29113e1772843eb9899c885))

## [2.0.1](https://github.com/Alorel/rxutils/compare/2.0.0...2.0.1) (2022-01-21)


### Bug Fixes

* **docs:** Fix install command & remove lodash section ([8e90b03](https://github.com/Alorel/rxutils/commit/8e90b03a1b7edf6d6afd709dcb72e380e4fed211))

# [2.0.0](https://github.com/Alorel/rxutils/compare/1.6.0...2.0.0) (2022-01-21)


### Bug Fixes

* **finaliseObserver:** Don't pass error to callback anymore ([0ae56ba](https://github.com/Alorel/rxutils/commit/0ae56bab85d16e8a58353603cc011fdae649edd4))


### Maintenance

* Move to rxjs 7 ([6eee417](https://github.com/Alorel/rxutils/commit/6eee417cb956e1a7b94250bc8737e8902431f6be))
* Rm InteropObservable from ObservifyInput ([a2a25f0](https://github.com/Alorel/rxutils/commit/a2a25f0926dac73e53fcfe0fd255362d999ae1e0))
* Update build system ([324e5b9](https://github.com/Alorel/rxutils/commit/324e5b965d6d6a2e12dc1fd9fb4d7c401c62e42d))


### BREAKING CHANGES

* rxjs 6 no longer supported
* InteropObservable is no longer a valid input for observify()
* ES5 and UMD bundles no longer emitted

# [1.6.0](https://github.com/Alorel/rxutils/compare/1.5.3...1.6.0) (2021-01-18)


### Features

* add finaliseObserver function ([](https://github.com/Alorel/rxutils/commit/3fadbc6))

## [1.5.3](https://github.com/Alorel/rxutils/compare/1.5.2...1.5.3) (2020-10-31)


### Bug Fixes

* **countEmissions:** Emit 0 if source completes without emitting ([](https://github.com/Alorel/rxutils/commit/5bc00f8))


### Maintenance

* Refresh package lock ([](https://github.com/Alorel/rxutils/commit/6c0137e))


### Refactoring

* **debounceRandom:** Remove extraneous function wrapper ([](https://github.com/Alorel/rxutils/commit/b6df7ef))
* Remove internal isTruthy function ([](https://github.com/Alorel/rxutils/commit/e4a55b9))

## [1.5.2](https://github.com/Alorel/rxutils/compare/1.5.1...1.5.2) (2020-02-24)


### Bug Fixes

* Removed FESM builds as they were breaking on /operators imports ([](https://github.com/Alorel/rxutils/commit/47a15e4))


### Maintenance

* Update dependencies ([](https://github.com/Alorel/rxutils/commit/c21d2f7))

## [1.5.1](https://github.com/Alorel/rxutils/compare/1.5.0...1.5.1) (2019-11-27)


### Bug Fixes

* **operators:** tapError's callback argument is no longer optional ([](https://github.com/Alorel/rxutils/commit/8c9d510))


### Documentation

* **nextComplete:** Add missing nextComplete example ([](https://github.com/Alorel/rxutils/commit/599c09b))


### Maintenance

* Updated dev dependecies ([](https://github.com/Alorel/rxutils/commit/c49eecf))

# [1.5.0](https://github.com/Alorel/rxutils/compare/1.4.0...1.5.0) (2019-10-30)


### Features

* **operators:** innerReduce and innerReduceRight operators added ([](https://github.com/Alorel/rxutils/commit/5f6147e))
* **util:** nextComplete utility added ([](https://github.com/Alorel/rxutils/commit/37f00a0))


### Tests

* Fixed some suite names ([](https://github.com/Alorel/rxutils/commit/5c52dff))

# [1.4.0](https://github.com/Alorel/rxutils/compare/1.3.0...1.4.0) (2019-10-12)


### Bug Fixes

* Export ArrayMapFn type from root ([](https://github.com/Alorel/rxutils/commit/f41b351))


### Features

* **creators:** asyncFilter creator ([](https://github.com/Alorel/rxutils/commit/3976251))
* **util:** observify function ([](https://github.com/Alorel/rxutils/commit/267212b))


### Tests

* **asyncMap:** Added a test for a promise input ([](https://github.com/Alorel/rxutils/commit/771c484))
* **asyncMap:** Added test to forward errors ([](https://github.com/Alorel/rxutils/commit/14b60f9))

# [1.3.0](https://github.com/Alorel/rxutils/compare/1.2.0...1.3.0) (2019-10-07)


### Documentation

* Added missing `[@since](https://github.com/since)` tags to typedoc ([8170cb0](https://github.com/Alorel/rxutils/commit/8170cb0))


### Features

* **Creators:** asyncMap creator added ([09a207c](https://github.com/Alorel/rxutils/commit/09a207c))

# [1.2.0](https://github.com/Alorel/rxutils/compare/1.1.0...1.2.0) (2019-10-06)


### Features

* **Operators:** innerFilter operator ([bc77141](https://github.com/Alorel/rxutils/commit/bc77141))


### Maintenance

* Add typedoc intermediary report file to gitignore ([e35c85f](https://github.com/Alorel/rxutils/commit/e35c85f))
* Update dev dependencies ([b4fa3c7](https://github.com/Alorel/rxutils/commit/b4fa3c7))

# [1.1.0](https://github.com/Alorel/rxutils/compare/1.0.0...1.1.0) (2019-08-11)


### Documentation

* Generate correct version in docs/README.md header ([1a249ca](https://github.com/Alorel/rxutils/commit/1a249ca))


### Features

* **util:** Added a nextObserver factory ([a5977dd](https://github.com/Alorel/rxutils/commit/a5977dd))
* **util:** Added a NOOP_OBSERVER constant ([bdaa2b3](https://github.com/Alorel/rxutils/commit/bdaa2b3))


### Maintenance

* Add missing semicolon in generate-index-test.js ([264edce](https://github.com/Alorel/rxutils/commit/264edce))
* Refresh lockfile ([ca6c4c0](https://github.com/Alorel/rxutils/commit/ca6c4c0))

# 1.0.0 (2019-08-04)


### Features

* initial release ([490028b](https://github.com/Alorel/rxutils/commit/490028b))
