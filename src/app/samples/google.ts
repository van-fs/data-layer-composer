import { ComposerProject } from '../models/project';

export const gaProject: ComposerProject = {
  variable: 'dataLayer',
  datalayer: [
    {
      pageType: 'Home',
      pageName: 'Home: Fruit shoppe',
    },
    {
      'gtm.start': 1598892794094,
      event: 'gtm.js',
      'gtm.uniqueEventId': 1,
    },
    {
      userProfile: {
        userId: '101',
        userType: 'member',
        loyaltyProgram: 'early-adopter',
        hashedEmail: '555-12232-2332232-232332',
      },
    },
    {
      event: 'impressions_loaded',
      ecommerce: {
        promoView: {
          promotions: [
            {
              id: '1004-Blueberries123321',
              name: 'Fruits',
              creative: 'Blueberries123321',
              position: 'Feature',
            },
            {
              id: '1001-Strawberries222333',
              name: 'Fruits',
              creative: 'Strawberries222333',
              position: 'Sub1',
            },
          ],
        },
      },
      'gtm.uniqueEventId': 6,
    },
    {
      event: 'gtm.dom',
      'gtm.uniqueEventId': 12,
    },
    {
      event: 'Social-media Loaded',
      'gtm.uniqueEventId': 27,
    },
    {
      event: 'recs loaded',
      ecommerce: {
        impressions: [
          {
            name: 'Heritage Huckleberries',
            id: 'P000525722',
            price: '2.99',
            category: 'homepage product recs',
            variant: '',
            list: 'homepage product recs',
            position: 1,
            dimension3: 4.7,
          },
          {
            name: 'Classic Corn',
            id: 'P000614444',
            price: '4.00',
            category: 'homepage product recs',
            variant: '',
            list: 'homepage product recs',
            position: 2,
            dimension3: 5,
          },
        ],
      },
      'gtm.uniqueEventId': 28,
    },
    {
      event: 'gtm.load',
      'gtm.uniqueEventId': 42,
    },
    {
      event: 'gtm.click',
      'gtm.element': {},
      'gtm.elementClasses': 'x-icon',
      'gtm.elementId': '',
      'gtm.elementTarget': '',
      'gtm.elementUrl': '',
      'gtm.uniqueEventId': 45,
    },
  ],
  rules: [
    {
      "id": "fs-ga-page-type",
      "source": "dataLayer[0]",
      "operators": [
        { "name": "query", "select": "$[?(pageType, pageName)]" },
        { "name": "insert", "value": "View Page Type" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-impressions",
      "source": "dataLayer[6]",
      "operators": [
        { "name": "query", "select": "$.ecommerce.impressions" },
        { "name": "fan-out" },
        { "name": "insert", "value": "Commerce impression" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-promotions",
      "source": "dataLayer[3]",
      "operators": [
        { "name": "query", "select": "$.ecommerce.promoView.promotions" },
        { "name": "fan-out" },
        { "name": "insert", "value": "Commerce promotion" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-user-vars",
      "source": "dataLayer[2]",
      "operators": [
        { "name": "query", "select": "$[?(userProfile)]" },
        { "name": "flatten" },
        { "name": "query", "select": "$[?(userId!=-1)]" },
        { "name": "insert", "select": "userId" }
      ],
      "destination": "FS.setUserVars",
      "readOnLoad": true,
      "monitor": true
    }
  ]
}
