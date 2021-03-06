import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { DataLayerTarget } from '@fullstory/data-layer-observer';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  @Input() object: any;

  @Input() source = '';

  @Output() sourceChange = new EventEmitter<string>();

  @Output() target = new EventEmitter<DataLayerTarget>();

  error = '';

  sourceControl = new FormControl('', [Validators.required]);

  sources: string[] = [];

  filteredSources: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    if (this.object) {
      this.index(this.object, '');
    }

    if (this.source) {
      this.index((window as any)[this.source], this.source);
      this.sourceControl.setValue(this.source);
      this.emit(this.source);
    }

    this.filteredSources = this.sourceControl.valueChanges.pipe(
      map(value => this.filterSources(value))
    );

    this.sourceControl.valueChanges.pipe(
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((source: string) => {
      // allows validation even if the user has not moved out of field
      this.sourceControl.markAsTouched();
      this.emit(source);
    });
  }

  private filterSources(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sources.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private index(root: any, path: string) {
    if (typeof root === 'object') {
      if (!Array.isArray(root)) {
        Object.getOwnPropertyNames(root).forEach(property => {
          if (typeof root[property] === 'object') {
            console.debug(`indexing ${path} checking ${property}`);

            // guard against a list of primitives
            if (Array.isArray(root[property]) && typeof root[property][0] !== 'object') {
              console.debug(`indexing skipped for ${path}.${property}`);
              return;
            }

            const propertyPath = Array.isArray(root[property]) ? `${path}.${property}[0]` : `${path}.${property}`;
            this.sources.push(propertyPath);
            this.index(root[property], propertyPath);
          }
        });
      }
    }
  }

  emit(source: string) {
    try {
      const t = DataLayerTarget.find(source);

      this.sourceControl.setErrors(null);
      this.sourceChange.emit(source);
      this.target.emit(t);
    } catch (err) {
      console.error(`Failed to find data layer target ${source}`);
      this.sourceControl.setErrors({ error: true });
      this.target.emit(null);
    }
  }
}
