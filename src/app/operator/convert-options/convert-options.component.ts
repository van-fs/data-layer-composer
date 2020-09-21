import { Component, OnInit } from '@angular/core';

import { OperatorComponent } from '../operator.component';

@Component({
  selector: 'app-convert-options',
  templateUrl: './convert-options.component.html',
  styleUrls: ['../operator.component.scss']
})
export class ConvertOptionsComponent extends OperatorComponent implements OnInit {

  properties: string[] = [];

  types = ['bool', 'date', 'int', 'real', 'string'];

  ngOnInit() {
    console.debug(`<app-convert-options> ${JSON.stringify(this.data[this.index])}`);
    if (!this.options.properties) {
      const result = this.data[this.index];
      Object.getOwnPropertyNames(result).forEach(property => {
        if (typeof result[property] !== 'object' && typeof result[property] !== 'function') {
          this.properties.push(property);
        }
      });
    } else {
      this.properties = this.options.properties.split(',');
    }
  }


}
