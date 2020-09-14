import { Component, ViewChild, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataLayerRule, LogEvent } from '@fullstory/data-layer-observer';

import { DataLayerService, DefaultDataLayer } from 'src/app/services/datalayer.service';
import { ObserverService } from './services/observer.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Data Layer Composer';

  datalayer = 'Paste your data layer here ...';

  @ViewChild('datalayerTabs', { static: false }) datalayerTabs: MatTabGroup;

  logs: LogEvent[] = [];

  output: string[] = [];

  rules: DataLayerRule[] = [];

  registered: DataLayerRule[] = [];

  constructor(
    private datalayerService: DataLayerService,
    public observerService: ObserverService,
    private snackBar: MatSnackBar) {
    this.datalayer = datalayerService.load();

    this.observerService.log$.subscribe((event: LogEvent) => {
      snackBar.open(event.message, '', { duration: 4000 });
      this.logs.push(event);
      this.datalayerTabs.selectedIndex = 2;
    });

    this.observerService.output$.subscribe((data: any[]) => {
      this.output.push(JSON.stringify(data, null, 2));
      this.datalayerTabs.selectedIndex = 1;
    });

    this.observerService.registered$.subscribe((rule: DataLayerRule) => {
      this.registered.push(rule);
      snackBar.open('Successfully registered rule', '', { duration: 2000 });
    });
  }

  addRule() {
    this.rules.push({
      id: `${Date.now().toString()}`,
      source: 'digitalData',
      operators: [],
      destination: 'FS.event',
    });
  }

  clear() {
    this.output = [];
    this.logs = [];
  }

  load(datalayer: string) {
    this.datalayer = this.datalayerService.load(datalayer);
    this.snackBar.open('Loaded data layer from text area', '', { duration: 2000 });
  }

  loadSample(type: DefaultDataLayer) {
    this.datalayer = this.datalayerService.instantiate(type as DefaultDataLayer);
    this.snackBar.open('Loaded sample data layer', '', { duration: 2000 });
  }

  printRules(): string {
    return JSON.stringify(this.registered, null, 2);
  }

  run() {
    this.observerService.fireEvents();
  }

  save() {
    this.datalayerService.save();
  }
}
