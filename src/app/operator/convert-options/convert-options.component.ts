import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { OperatorComponent } from '../operator.component';
import { DataLayerTarget } from '@fullstory/data-layer-observer';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-convert-options',
  templateUrl: './convert-options.component.html',
  styleUrls: ['../operator.component.scss']
})
export class ConvertOptionsComponent extends OperatorComponent implements OnInit, AfterViewInit {

  @ViewChild('propertySelect', { static: false }) propertySelect: MatSelect;

  properties: string[] = [];

  types = ['bool', 'date', 'int', 'real', 'string'];

  ngOnInit() {
    const target = DataLayerTarget.find(this.source);

    if (!this.options.properties) {
      const result = target.query();

      Object.getOwnPropertyNames(result).forEach(property => {
        if (typeof result[property] !== 'object' && typeof result[property] !== 'function') {
          this.properties.push(property);
        }
      });
    } else {
      this.properties = this.options.properties.split(',');
    }
  }

  ngAfterViewInit() {
    if (this.options.properties) {
      this.propertySelect.options.forEach(option => {
        if (this.options.properties.indexOf(option.value) > -1) {
          console.log(option.value)

          try {
            option.select();
          } catch (err) {
            // ignore ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
          }
        }
      });
    }
  }

  selectProperty(event: MatSelectChange) {
    const { source: { selected } } = event;
    this.options.properties = (selected as MatOption[]).map((option: MatOption) => option.value).join(',');
  }
}
