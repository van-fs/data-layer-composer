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

  @Input() source = '';

  @Output() sourceChange = new EventEmitter<string>();

  @Output() target = new EventEmitter<DataLayerTarget>();

  error = '';

  sourceControl = new FormControl('', [Validators.required]);

  sources: string[] = [];

  filteredSources: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.index((window as any)[this.source], this.source);
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

      try {
        const t = DataLayerTarget.find(source);

        this.sourceControl.setErrors(null);
        this.sourceChange.emit(source);
        this.target.emit(t);
      } catch (err) {
        this.sourceControl.setErrors({ error: true });
        this.target.emit(null);
      }
    });
  }

  private filterSources(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sources.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private index(root: any, path: string) {
    Object.getOwnPropertyNames(root).forEach(property => {
      if (typeof root[property] === 'object') {
        // guard against a list of primitives
        if (Array.isArray(root[property]) && typeof Array.isArray(root[property][0]) !== 'object') {
          return;
        }

        const propertyPath = Array.isArray(root[property]) ? `${path}[${property}]` : `${path}.${property}`;
        this.sources.push(propertyPath);
        this.index(root[property], propertyPath);
      }
    });
  }

  emit(source: string) {
    const t = DataLayerTarget.find(source);

    this.sourceControl.setErrors(null);
    this.sourceChange.emit(source);
    this.target.emit(t);
    console.log(t)
  }
}
