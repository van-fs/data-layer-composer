import { OperatorOptions, DataLayerTarget, DataLayerRule } from '@fullstory/data-layer-observer';
import DataHandler from '@fullstory/data-layer-observer/dist/handler';

export class ComposerRule {

  handler: DataHandler;

  operators: OperatorOptions[] = [];

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

  constructor(public source = 'digitalData', public destination: string = 'FS.event',
    public id: string = `${Date.now().toString()}`, public description?: string) {

  }

  addOperator(options: OperatorOptions) {
    this.operators.push(options);
    this.verified = false;
  }

  removeOperator(options: OperatorOptions) {
    const i = this.operators.findIndex(operator => operator === options);
    if (i !== -1) {
      this.operators.splice(i, 1);
    }
    this.verified = false;
  }

  toDataLayerRule() {
    return {
      id: this.id,
      source: this.source,
      operators: this.operators,
      destination: this.destination,
      readOnLoad: this.readOnLoad,
      monitor: this.monitor,
      debug: this.debug
    };
  }
}
