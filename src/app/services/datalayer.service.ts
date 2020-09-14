import { Injectable } from '@angular/core';

import basicDigitalData from '../models/CEDDL';

export type DefaultDataLayer = 'ceddl';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  instantiate(type: DefaultDataLayer): string {
    switch (type) {
      case 'ceddl':
        return this.load(JSON.stringify(basicDigitalData));
      default:
        return '';
    }
  }

  load(datalayer?: string): string {
    (window as any).digitalData = datalayer ? JSON.parse(datalayer) :
      localStorage.getItem('datalayer') ? JSON.parse(localStorage.getItem('datalayer')) : {};
    return JSON.stringify((window as any).digitalData, null, 2);
  }

  save() {
    const datalayer = (window as any).digitalData;

    if (datalayer) {
      localStorage.setItem('datalayer', JSON.stringify(datalayer));
    }
  }
}
