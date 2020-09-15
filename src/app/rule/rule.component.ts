import { Component, Input } from '@angular/core';
import { DataLayerRule, OperatorOptions, DataLayerTarget } from '@fullstory/data-layer-observer';
import { ObserverService } from '../services/observer.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent {

  @Input() rule: DataLayerRule;

  target: DataLayerTarget = null;

  passed = false;

  aliases = [
    'convert',
    'fan-out',
    'flatten',
    'insert',
    'query',
    'rename',
  ];

  constructor(private observerService: ObserverService) {
    this.observerService.registered$.subscribe(rule => {
      if (rule === this.rule) {
        this.passed = true;
      }
    });
  }

  addOperator(name: string) {
    this.rule.operators.push({
      name
    });
  }

  removeOperator(options: OperatorOptions) {
    const i = this.rule.operators.findIndex(operator => operator === options);
    if (i !== -1) {
      this.rule.operators.splice(i, 1);
    }
  }

  register() {
    this.observerService.registerRule(this.rule);
  }

  targetChange(target: DataLayerTarget) {
    this.target = target;
  }

}
