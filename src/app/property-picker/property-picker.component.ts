import { Component, OnInit, Output, Input, ViewChild, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-property-picker',
  templateUrl: './property-picker.component.html',
  styleUrls: ['./property-picker.component.scss']
})
export class PropertyPickerComponent implements AfterViewInit, OnInit, OnChanges {

  @ViewChild('propertySelect', { static: false }) propertySelect: MatSelect;

  @Input() allowObjects = false;

  @Input() multiple = false;

  @Input() object: any;

  @Input() required = false;

  @Input() selection: string;

  @Output() selectionChange = new EventEmitter<string>();

  properties: string[] = []; // discovered properties in the object

  ngAfterViewInit() {
    if (this.selection) {
      // select any properties that match existing selections
      this.selection.split(',').forEach(property => {
        try {
          const found = this.propertySelect.options.find(option => option.value === property);
          if (found) {
            found.select();
          }
        } catch (err) {
          // ignore ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.discoverProperties();
  }

  ngOnInit() {
    if (this.selection) {
      this.properties = this.selection.split(',');
      return;
    }

    this.discoverProperties();
  }

  private discoverProperties() {
    console.debug(`discover properties ${JSON.stringify(this.object)}`);

    this.properties = [];

    if (this.object) {
      // itemize all properties in the object
      Object.getOwnPropertyNames(this.object).forEach(property => {
        if (Array.isArray(this.object[property]) || typeof this.object[property] !== 'function') {
          if (this.object[property] === 'object') {
            if (this.allowObjects) {
              this.properties.push(property);
            } else {
              return;
            }
          } else {
            this.properties.push(property);
          }
        }
      });
    }
  }

  selectProperty(event: MatSelectChange) {
    const { source: { selected } } = event;
    this.selectionChange.emit((selected as MatOption[]).map(option => option.value).join(','));
  }

}
