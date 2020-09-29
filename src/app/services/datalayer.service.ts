import { Injectable } from '@angular/core';
import { DataLayerTarget } from '@fullstory/data-layer-observer';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  find(source: string) {
    return DataLayerTarget.find(source);
  }

  instantiate(variable: string, data: object): string {
    return this.load(variable, JSON.stringify(data));
  }

  load(variable: string, datalayer?: string | object): string {
    let parent: any = window;
    const path = variable.split('.');

    for (let i = 0; i < path.length; i += 1) {
      if (!parent[path[i]]) {
        parent[path[i]] = {};
      }

      if (i === path.length - 1) {
        parent[path[i]] = typeof datalayer === 'string' ? JSON.parse(datalayer) : datalayer;
      }

      parent = parent[path[i]];
    }

    return JSON.stringify(parent, null, 2);
  }

  save() {
    const datalayer = (window as any).digitalData;

    if (datalayer) {
      localStorage.setItem('datalayer', JSON.stringify(datalayer));
    }
  }
}
