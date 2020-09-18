import { Component, Input, OnInit } from '@angular/core';
import { OperatorOptions, DataLayerTarget } from '@fullstory/data-layer-observer';
import { ObserverService } from '../services/observer.service';
import { ComposerRule } from '../models/composer-rule';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ComposerOperator } from '../models/composer-operator';
import { DataLayerService } from '../services/datalayer.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  @Input() rule: ComposerRule;

  mode = 'rule';

  target: DataLayerTarget = null;

  lastOutput: any;

  serialized = '';

  aliases = [
    'convert',
    'fan-out',
    'flatten',
    'insert',
    'query',
    'rename',
  ];

  constructor(
    private datalayerService: DataLayerService,
    private snackBar: MatSnackBar,
    private observerService: ObserverService
  ) {
    this.observerService.output$.subscribe((data: any[]) => {
      this.lastOutput = data.length === 1 ? data[0] : data;
    });
  }

  ngOnInit() {
    this.lastOutput = this.datalayerService.find(this.rule.source);
  }

  addOperator(name: string) {
    this.rule.operators.push(new ComposerOperator({
      name
    }));
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  removeOperator(options: OperatorOptions) {
    this.rule.removeOperator(options);
  }

  setMode(mode: string) {
    this.mode = mode;
  }

  remove() {
    this.rule.removed = true;
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
