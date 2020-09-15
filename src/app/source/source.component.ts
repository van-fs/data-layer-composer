import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  @Input() source = '';

  @Output() sourceChange = new EventEmitter<string>();

  sourceControl = new FormControl();

  sources: string[] = [];

  filteredSources: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.index((window as any)[this.source], this.source);
    this.filteredSources = this.sourceControl.valueChanges.pipe(
      map(value => this.filter(value))
    );
  }

  private filter(value: string): string[] {
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

  target(source: string) {
    this.sourceChange.emit(source);
  }
}
