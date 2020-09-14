import { Component, Input } from '@angular/core';

import { OperatorOptions } from '@fullstory/data-layer-observer';
import { OperatorOptionsComponent } from '../operator.component';

@Component({
  selector: 'app-fan-out-options',
  templateUrl: './fan-out-options.component.html',
  styleUrls: ['../operator.component.scss']
})
export class FanOutOptionsComponent extends OperatorOptionsComponent {

}
