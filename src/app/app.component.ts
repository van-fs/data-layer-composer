import { Component, ViewChild, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { LogEvent, DataLayerRule } from '@fullstory/data-layer-observer';

import { ComposerRule } from './models/composer-rule';
import { DataLayerService } from 'src/app/services/datalayer.service';
import { ObserverService } from './services/observer.service';

import { appMeasurementProject, cartProject, pageProject, productProject, transactionProject, userProject, gaProject } from './samples';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Data Layer Composer';

  datalayer = '';

  @ViewChild('datalayerTabs', { static: false }) datalayerTabs: MatTabGroup;

  logs: LogEvent[] = [];

  output: string;

  rules: ComposerRule[] = [];

  variable = 'digitalData';

  constructor(
    private datalayerService: DataLayerService,
    public observerService: ObserverService,
    private snackBar: MatSnackBar) {

    this.observerService.log$.subscribe((event: LogEvent) => {
      snackBar.open(event.message, '', { duration: 4000 });
      this.logs.push(event);
      this.datalayerTabs.selectedIndex = 2;
    });

    this.observerService.output$.subscribe((data: any[]) => {
      this.output = JSON.stringify(data, null, 2);
      this.datalayerTabs.selectedIndex = 1;
    });
  }

  addRule() {
    this.rules.push(new ComposerRule(this.variable));
  }

  async copySnippet() {
    await navigator.clipboard.writeText(`((datalayer) => {
      if (!datalayer) alert("Data layer not found");
      function copy() {
        navigator.clipboard.writeText(JSON.stringify(datalayer, null, 2)).then(() =>
          alert("Data layer copied to clipboard"), (err) => console.err(err));
      }
      document.addEventListener("click", copy);
    })(DATALAYER);
    `.replace('DATALAYER', this.variable));

    this.snackBar.open(`Copied snippet to clipboard`, '', { duration: 2000 });
  }

  async pasteDataLayer() {
    this.datalayer = await navigator.clipboard.readText();
    this.load(this.datalayer);
  }

  clear() {
    this.output = '';
    this.logs = [];
  }

  load(datalayer: string) {
    this.datalayer = this.datalayerService.load(this.variable, datalayer);
    console.log(this.datalayer)
    this.snackBar.open(`Loaded data layer into ${this.variable}`, '', { duration: 2000 });
  }

  loadSample(id: string) {
    this.rules = [];
    let rules: DataLayerRule[] = [];

    switch (id) {
      case 'adobe-app-measurement':
        this.variable = appMeasurementProject.variable;
        this.datalayer = this.datalayerService.load(this.variable, appMeasurementProject.datalayer);
        rules = appMeasurementProject.rules;
        break;
      case 'ceddl-cart':
        this.variable = cartProject.variable;
        this.datalayer = this.datalayerService.load(this.variable, cartProject.datalayer);
        rules = cartProject.rules;
        break;
      case 'ceddl-page':
        this.variable = cartProject.variable;
        this.datalayer = this.datalayerService.load(this.variable, pageProject.datalayer);
        rules = pageProject.rules;
        break;
      case 'ceddl-product':
        this.variable = cartProject.variable;
        this.datalayer = this.datalayerService.load(this.variable, productProject.datalayer);
        rules = productProject.rules;
        break;
      case 'ceddl-transaction':
        this.variable = cartProject.variable;
        this.datalayer = this.datalayerService.load(this.variable, transactionProject.datalayer);
        rules = transactionProject.rules;
        break;
      case 'ceddl-user':
        this.variable = cartProject.variable;
        this.datalayer = this.datalayerService.load(this.variable, userProject.datalayer);
        rules = userProject.rules;
        break;
      case 'ga':
        this.variable = gaProject.variable;
        this.datalayer = this.datalayerService.load(this.variable, gaProject.datalayer);
        rules = gaProject.rules;
        break;
      default:
    }

    rules.forEach(rule => {
      const composerRule = new ComposerRule(rule.source, rule.destination as string, rule.id, rule.description);
      rule.operators.forEach(operator => {
        composerRule.addOperator(operator);
      });

      this.rules.push(composerRule);
    });

    this.datalayerTabs.selectedIndex = 0;
    this.snackBar.open(`Loaded project ${id} into ${this.variable}`, '', { duration: 2000 });
  }

  save() {
    this.datalayerService.save();
  }
}
