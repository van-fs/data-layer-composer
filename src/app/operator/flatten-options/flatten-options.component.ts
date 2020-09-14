import { Component, Input } from '@angular/core';

import { OperatorOptions } from '@fullstory/data-layer-observer';
import { OperatorOptionsComponent } from '../operator.component';

@Component({
  selector: 'app-flatten-options',
  templateUrl: './flatten-options.component.html',
  styleUrls: ['../operator.component.scss']
})
export class FlattenOptionsComponent extends OperatorOptionsComponent {

}
