import { Component, OnInit } from '@angular/core';

import { OperatorComponent } from '../operator.component';

@Component({
  selector: 'app-insert-options',
  templateUrl: './insert-options.component.html',
  styleUrls: ['../operator.component.scss']
})
export class InsertOptionsComponent extends OperatorComponent implements OnInit {

  insertType: 'select' | 'value';

  ngOnInit() {
    console.debug(`<app-insert-options> ${JSON.stringify(this.options)}`);
    super.ngOnInit();

    if (this.options) {
      this.insertType = this.options.select ? 'select' : 'value';
    }
  }

  setPosition(position: string | number) {
    if (typeof position === 'string') {
      position = parseInt(position);
    }

    this.options.position = position;
  }

  setType(type: 'select' | 'value') {
    this.insertType = type;

    if (type === 'select') {
      delete this.options.value;
    } else {
      delete this.options.select;
    }
  }

  updateSelect(selector: string) {
    if (selector.startsWith('$')) {
      this.options.select = selector.substring(1);
    }
  }
}
