import {expect} from 'chai';
import {noop} from 'lodash';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {pickProps} from '../../src/operators';

//tslint:disable:object-literal-sort-keys

interface Foo {
  bar: number;

  baz: number;

  foo: number;

  qux: number;
}

type FooObj = Foo & { deep: Foo };

describe('operators/pickProps', () => {
  let obj: FooObj;
  let source$: Observable<FooObj>;

  beforeEach('Reset object and source', () => {
    obj = {
      deep: {
        foo: 1,
        bar: 2,
        qux: 3,
        baz: 4
      },
      foo: 1,
      bar: 2,
      qux: 3,
      baz: 4
    };
    source$ = of(obj);
  });

  it('Should throw if props is not an array', () => {
    expect(() => pickProps(<any>1)).to.throw(TypeError, 'Picked properties must be an array');
  });

  it('Should map to {} if an empty property array is given', async () => {
    await source$
      .pipe(
        pickProps([]),
        tap(out => {
          expect(out).to.deep.eq({});
        })
      )
      .toPromise();
  });

  it('Should map to {} when the source is a non-object', async () => {
    await of<any>(1)
      .pipe(
        pickProps(['foo']),
        tap(out => {
          expect(out).to.deep.eq({});
        })
      )
      .toPromise();
  });

  it('Should have implicit typings', async () => {
    await source$
      .pipe(
        pickProps(['foo', 'bar']),
        tap(out => {
          noop(out.foo);
          noop(out.bar);
        })
      )
      .toPromise();
  });

  it('Should work with shallow props', async () => {
    await source$
      .pipe(
        pickProps(['deep', 'qux', 'notAProp']),
        tap(out => {
          expect(out).to.deep.eq({
            deep: {
              foo: 1,
              bar: 2,
              qux: 3,
              baz: 4
            },
            qux: 3
          });
        })
      )
      .toPromise();
  });

  it('Should work with deep props', async () => {
    await source$
      .pipe(
        pickProps(['foo', 'deep.bar', 'deep.qux', 'notAProp']),
        tap(out => {
          expect(out).to.deep.eq({
            foo: 1,
            deep: {
              bar: 2,
              qux: 3
            }
          });
        })
      )
      .toPromise();
  });
});
