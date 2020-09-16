import { ComposerProject } from '../models/project';

export const appMeasurementProject: ComposerProject = {
  variable: 's',
  datalayer: {
    campaign: 'fruit2020',
    channel: 'desktop',
    hier: 'home/Products',
    list: 'apple,orange,mangocado',
    pageName: 'The Fruit Shoppe',
    pageType: 'homepage',
    pageURL: 'https://fruitshoppe.firebaseapp.com/',
    products: 'fruit;Cosmic Crisp Apple;1;15.55;;;;',
    purchaseID: 'cart-1234',
    referrer: 'https://www.google.com/url?&q=The%20Fruit%20Shoppe',
    server: 'google',
    state: 'Georgia',
    timestamp: '1595361140824',
    transactionID: 'tr-235098236',
    zip: '30606',
    eVar1: 'pr-12333211',
    eVar10: 'JohnyAppleseed',
    eVar20: 'Athens',
    eVar50: 'cca-1234',
    eVar60: '21.95',
    prop1: 'USD',
  },
  rules: [
    {
      "id": "fs-event-adobe-evars",
      "description": "send only Adobe eVars to FS.event as an 'Adobe eVars' event",
      "source": "s[^(eVar)]",
      "operators": [
        {
          "name": "insert",
          "value": "Adobe eVars"
        }
      ],
      "destination": "FS.event"
    },
    {
      "id": "fs-identify-adobe-evars",
      "description": "send only select Adobe eVars to FS.identify using eVar1 as the uid",
      "source": "s[(eVar1,eVar10,eVar20)]",
      "operators": [
        {
          "name": "insert",
          "select": "eVar1"
        }
      ],
      "destination": "FS.identify"
    }
  ]
}
