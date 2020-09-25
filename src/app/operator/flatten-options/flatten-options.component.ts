import { Component } from '@angular/core';

import { OperatorComponent } from '../operator.component';

@Component({
  selector: 'app-flatten-options',
  templateUrl: './flatten-options.component.html',
  styleUrls: ['../operator.component.scss']
})
export class FlattenOptionsComponent extends OperatorComponent {

  setDepth(depth: string | number) {
    if (typeof depth === 'string') {
      depth = parseInt(depth);
    }

    this.options.maxDepth = depth;
  }

}
