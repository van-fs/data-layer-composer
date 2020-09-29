import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OperatorOptions, DataLayerTarget } from '@fullstory/data-layer-observer';
import { ObserverService } from '../services/observer.service';
import { ComposerRule } from '../models/composer-rule';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ComposerOperator } from '../models/composer-operator';
import { DataLayerService } from '../services/datalayer.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements AfterViewInit {

  @ViewChild('ruleTabs', { static: false }) ruleTabs: MatTabGroup;

  @Input() rule: ComposerRule;

  mode = 'rule';

  target: DataLayerTarget = null;

  stepData: any[] = [];

  serialized = '';

  aliases = [
    'convert',
    'fan-out',
    'flatten',
    'insert',
    'query',
    'rename',
  ];

  output: string[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private observerService: ObserverService
  ) {

  }

  ngAfterViewInit() {
    if (this.rule) {
      console.debug(`<app-rule> ${this.rule.id}`);
    }

    // if serialized rule is ready then run a test to populate the steps
    if (this.rule.operators) {
      this.test();
    }
  }

  addOperator(name: string) {
    this.test();  // ensure the most up to date output
    this.rule.operators.push(new ComposerOperator({
      name
    }));
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.test();
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

  test(showOutput = false) {
    this.output = [];

    this.stepData[0] = [this.rule.target.query()];
    console.debug(`stepData[0] ${JSON.stringify(this.stepData[0])}`);

    try {
      for (let i = 0; i < this.rule.operators.length; i++) {
        const options = this.rule.operators.slice(0, i + 1).filter(operator => operator.enabled).map(operator => operator.options);
        this.observerService.test(this.rule.target, options, (...data) => {

          this.stepData[i + 1] = data;
          console.debug(`[${i + 1}] output ${JSON.stringify(data)}`);
        });
      }

      if (showOutput) {
        // NOTE that the rule.operators length is 1 less than the stepData always
        this.output.push(JSON.stringify(this.stepData[this.rule.operators.length], null, 2));
        console.debug(JSON.stringify(this.stepData, null, 2));

        this.ruleTabs.selectedIndex = 1;
      }

      this.serialized = JSON.stringify(this.rule.toDataLayerRule(), null, 2);
    } catch (err) {
      this.snackBar.open(err.message, '', { duration: 4000 });
      console.error(err);
    }
  }

  targetChange(target: DataLayerTarget) {
    this.target = target;
    this.rule.target = target;
  }

}
