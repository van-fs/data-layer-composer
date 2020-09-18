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
    (window as any)[variable] = typeof datalayer === 'string' ? JSON.parse(datalayer) : datalayer;
    return JSON.stringify((window as any)[variable], null, 2);
  }

  save() {
    const datalayer = (window as any).digitalData;

    if (datalayer) {
      localStorage.setItem('datalayer', JSON.stringify(datalayer));
    }
  }
}
