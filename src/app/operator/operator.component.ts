import { Component, Input } from '@angular/core';
import { OperatorOptions } from '@fullstory/data-layer-observer';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent {

  @Input() options: OperatorOptions;

  @Input() source: string;

}
