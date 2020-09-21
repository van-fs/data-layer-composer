import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { OperatorOptions } from '@fullstory/data-layer-observer';
import { ComposerOperator } from '../models/composer-operator';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  @Output() removed = new EventEmitter<OperatorOptions>();

  @Input() operator: ComposerOperator;

  @Input() data: any = [];

  @Input() options: OperatorOptions;

  advanced = false;

  index = 0;

  ngOnInit() {
    console.debug(`<app-operator> ${JSON.stringify(this.data)}`);

    // guard against null or undefined data input
    if (!this.data) {
      this.data = [];
    }

    if (this.operator) {
      this.options = this.operator.options;
    }
  }

  remove() {
    this.removed.emit(this.operator.options);
  }

  toggleAdvanced() {
    this.advanced = !this.advanced;
  }

  json(): string {
    return JSON.stringify(this.options);
  }

}
