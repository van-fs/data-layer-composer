import { Component } from '@angular/core';

import { OperatorOptionsComponent } from '../operator.component';

@Component({
  selector: 'app-convert-options',
  templateUrl: './convert-options.component.html',
  styleUrls: ['../operator.component.scss']
})
export class ConvertOptionsComponent extends OperatorOptionsComponent {

  types = ['bool', 'date', 'int', 'real', 'string'];

}
