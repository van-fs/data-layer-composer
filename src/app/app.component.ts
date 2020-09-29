import { Component, ViewChild, OnInit, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { LogEvent, DataLayerRule } from '@fullstory/data-layer-observer';

import { ComposerRule } from './models/composer-rule';
import { DataLayerService } from 'src/app/services/datalayer.service';
import { ObserverService } from './services/observer.service';

import {
  appMeasurementProject, cartProject, pageProject, productProject, transactionProject, userProject, gaProject,
  tealiumRetailProject
} from './samples';
import { StorageService } from './services/storage.service';
import { ComposerProject } from './models/project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Data Layer Composer';

  datalayer = '';

  logs: LogEvent[] = [];

  output: string;

  rules: ComposerRule[] = [];

  variable = 'digitalData';

  projectName = '';

  constructor(
    private datalayerService: DataLayerService,
    public observerService: ObserverService,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
  ) {

    this.observerService.log$.subscribe((event: LogEvent) => {
      snackBar.open(event.message, '', { duration: 4000 });
      this.logs.push(event);
    });
  }

  ngOnInit() {
    const path = window.location.pathname.substring(1); // remove leading /

    if (path) {
      this.projectName = path;
      if (this.projectName.startsWith('sample')) {
        this.loadSample(path);
      } else {
        // get from firebase
        this.storageService.load(this.projectName).subscribe(project => {
          this.loadProject(project);
        });
      }
    } else {
      this.newProject();
    }
  }

  addRule() {
    this.rules.unshift(new ComposerRule(this.variable));
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
    this.snackBar.open(`Loaded data layer into ${this.variable}`, '', { duration: 2000 });
  }

  loadSample(id: string) {
    switch (id) {
      case 'sample-adobe-app-measurement':
        this.loadProject(appMeasurementProject);
        break;
      case 'sample-ceddl-cart':
        this.loadProject(cartProject);
        break;
      case 'sample-ceddl-page':
        this.loadProject(pageProject);
        break;
      case 'sample-ceddl-product':
        this.loadProject(productProject);
        break;
      case 'sample-ceddl-transaction':
        this.loadProject(transactionProject);
        break;
      case 'sample-ceddl-user':
        this.loadProject(userProject);
        break;
      case 'sample-ga':
        this.loadProject(gaProject);
        break;
      case 'sample-tealium-retail':
        this.loadProject(tealiumRetailProject);
        break;
    }

    if (id.startsWith('sample')) {
      this.rules = this.rules.map(rule => {
        rule.removable = false;
        return rule;
      });
    }

    this.snackBar.open(`Loaded project ${id} into ${this.variable}`, '', { duration: 2000 });
  }

  loadProject(project: ComposerProject) {
    this.rules = [];

    this.variable = project.variable;
    this.datalayer = this.datalayerService.load(this.variable, project.datalayer);

    project.rules.forEach(rule => {
      const composerRule = new ComposerRule(rule.source, rule.destination as string, rule.id, rule.description);
      composerRule.readOnLoad = rule.readOnLoad;
      composerRule.monitor = rule.monitor;
      composerRule.debug = rule.debug;
      composerRule.url = rule.url;
      rule.operators.forEach(operator => {
        composerRule.addOperator(operator);
      });

      this.rules.push(composerRule);
    });
  }

  newProject() {
    location.href = this.storageService.createId();
  }

  save() {
    this.storageService.store(this.projectName, {
      datalayer: this.datalayer,
      variable: this.variable,
      rules: this.rules.map(rule => rule.toDataLayerRule()),
    } as ComposerProject);
  }
}
