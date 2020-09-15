import { Component, OnInit } from '@angular/core';

import { OperatorComponent } from '../operator.component';
import { DataLayerTarget } from '@fullstory/data-layer-observer';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-fan-out-options',
  templateUrl: './fan-out-options.component.html',
  styleUrls: ['../operator.component.scss']
})
export class FanOutOptionsComponent extends OperatorComponent implements OnInit {

  properties: string[] = [];

  ngOnInit() {
    const target = DataLayerTarget.find(this.source);
    const result = target.query();

    Object.getOwnPropertyNames(result).forEach(property => {
      if (typeof result[property] !== 'object' && typeof result[property] !== 'function') {
        this.properties.push(property);
      }
    });
  }

  selectProperty(event: MatSelectChange) {
    const { source: { selected } } = event;
    this.options.properties = (selected as MatOption[]).map((option: MatOption) => option.value).join(',');
  }
}
