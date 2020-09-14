import { Component, Input } from '@angular/core';
import { DataLayerRule } from '@fullstory/data-layer-observer';
import { ObserverService } from '../services/observer.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent {

  @Input() rule: DataLayerRule;

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

  register() {
    this.observerService.registerRule(this.rule);
  }

}
