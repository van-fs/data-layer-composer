import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
import { SourceComponent } from './source/source.component';
import { SelectComponent } from './select/select.component';
import { PropertyPickerComponent } from './property-picker/property-picker.component';

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
    RenameOptionsComponent,
    SourceComponent,
    SelectComponent,
    PropertyPickerComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
