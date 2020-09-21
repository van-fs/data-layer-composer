import { OperatorOptions, DataLayerTarget, DataLayerRule } from '@fullstory/data-layer-observer';
import DataHandler from '@fullstory/data-layer-observer/dist/handler';
import { ComposerOperator } from './composer-operator';

export class ComposerRule {

  operators: ComposerOperator[] = [];

  private _target: DataLayerTarget;

  set target(target: DataLayerTarget) {
    this._target = target;
  }

  get target(): DataLayerTarget {
    return this._target;
  }

  verified = false;

  readOnLoad?: boolean;

  monitor?: boolean;

  debug?: boolean;

  removed = false;  // hacky way to delete

  removable = true;

  constructor(public source = 'digitalData', public destination: string = 'FS.event',
    public id: string = `${Date.now().toString()}`, public description?: string) {

  }

  addOperator(options: OperatorOptions) {
    this.operators.push(new ComposerOperator(options));
    this.verified = false;
  }

  removeOperator(options: OperatorOptions) {
    const i = this.operators.findIndex(operator => operator.options === options);
    if (i !== -1) {
      this.operators.splice(i, 1);
    }
    this.verified = false;
  }

  toDataLayerRule() {
    return {
      id: this.id,
      source: this.source,
      operators: this.operators.filter(o => o.enabled).map(o => o.options),
      destination: this.destination,
      readOnLoad: this.readOnLoad,
      monitor: this.monitor,
      debug: this.debug
    };
  }
}
