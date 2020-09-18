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

  @Input() data: any;

  @Input() options: OperatorOptions;

  ngOnInit() {
    if (this.operator) {
      this.options = this.operator.options;
    }
  }

  remove() {
    this.removed.emit(this.operator.options);
  }

}
