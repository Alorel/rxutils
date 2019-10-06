import {expect} from 'chai';
import {of} from 'rxjs';
import {mkArrayFilterOperator} from '../../src/internal/mkArrayMapOperator';

describe('internal/mkArrayMapOperator', function () {
  class Changer {
    public readonly num = 2;

    public isTwo(v: any): boolean {
      return v === this.num;
    }

    public multiply(v: number): number {
      return v * this.num;
    }
  }

  let inst: Changer;

  beforeEach(() => {
    inst = new Changer();
  });

  it('Should map correctly', async () => {
    const res = of([1, 2, 3])
      .pipe(mkArrayFilterOperator(inst.multiply, 'map', inst));

    expect(await res.toPromise()).to.deep.eq([2, 4, 6]);
  });

  it('Should filter correctly', async () => {
    const res = of([1, 2, 3])
      .pipe(mkArrayFilterOperator(inst.isTwo, 'filter', inst));

    expect(await res.toPromise()).to.deep.eq([2]);
  });
});
