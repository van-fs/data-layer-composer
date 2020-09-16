import { DataLayerRule } from '@fullstory/data-layer-observer';

export interface ComposerProject {
  variable: string;
  datalayer: string | object;
  rules: DataLayerRule[];
}
