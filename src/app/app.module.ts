import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { RuleComponent } from './rule/rule.component';
import { OperatorComponent } from './operator/operator.component';
import { ConvertOptionsComponent } from './operator/convert-options/convert-options.component';
import { FanOutOptionsComponent } from './operator/fan-out-options/fan-out-options.component';
import { FlattenOptionsComponent } from './operator/flatten-options/flatten-options.component';
import { InsertOptionsComponent } from './operator/insert-options/insert-options.component';
import { QueryOptionsComponent } from './operator/query-options/query-options.component';
import { RenameOptionsComponent } from './operator/rename-options/rename-options.component';

@NgModule({
  declarations: [
    AppComponent,
    RuleComponent,
    OperatorComponent,
    ConvertOptionsComponent,
    FanOutOptionsComponent,
    FlattenOptionsComponent,
    InsertOptionsComponent,
    QueryOptionsComponent,
    RenameOptionsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
