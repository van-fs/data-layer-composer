import { Component, Input } from '@angular/core';
import { OperatorOptions, DataLayerTarget } from '@fullstory/data-layer-observer';
import { ObserverService } from '../services/observer.service';
import { ComposerRule } from '../models/composer-rule';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent {

  @Input() rule: ComposerRule;

  mode = 'rule';

  target: DataLayerTarget = null;

  serialized = '';

  aliases = [
    'convert',
    'fan-out',
    'flatten',
    'insert',
    'query',
    'rename',
  ];

  constructor(private snackBar: MatSnackBar, private observerService: ObserverService) {

  }

  addOperator(name: string) {
    this.rule.operators.push({
      name
    });
  }

  removeOperator(options: OperatorOptions) {
    this.rule.removeOperator(options);
  }

  setMode(mode: string) {
    this.mode = mode;
  }

  test() {
    try {
      this.observerService.test(this.rule);
      this.serialized = JSON.stringify(this.rule.toDataLayerRule(), null, 2);
    } catch (err) {
      this.snackBar.open(err.message, '', { duration: 4000 });
    }
  }

  targetChange(target: DataLayerTarget) {
    this.target = target;
    this.rule.target = target;
  }

}
