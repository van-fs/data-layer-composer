import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataLayerRule } from '@fullstory/data-layer-observer';
import { ComposerProject } from '../models/project';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

export interface Serializable {
  datalayer: string;
  variable: string;
  rules: DataLayerRule[];
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {

  }

  createId(): string {
    return this.afs.createId();
  }

  load(id: string) {
    return this.afs.collection('projects').doc<ComposerProject>(id).valueChanges();
  }

  async store(id: string, project: ComposerProject) {
    await this.afs.collection('projects').doc(id).set(project);
    this.snackBar.open(`Saved project ${id}`, '', { duration: 2000 });
  }
}
