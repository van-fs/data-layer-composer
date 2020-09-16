import { ComposerProject } from '../models/project';

export const pageProject: ComposerProject = {
  variable: 'digitalData',
  datalayer: {
    page: {
      pageInfo: {
        pageID: '1745',
        pageName: 'The Fruit Shoppe',
        destinationURL: 'https://fruitshoppe.firebaseapp.com/',
        referringURL: 'https://www.google.com/url?&q=The%20Fruit%20Shoppe',
        sysEnv: 'desktop',
        variant: '2',
        version: '1.14',
        breadcrumbs: ['home', 'Products'],
        author: 'D Falco',
        issueDate: '2020-06-23',
        effectiveDate: '2020-07-23',
        expiryDate: '2021-06-23',
        language: 'en-US',
        industryCodes: '7372',
        publisher: 'FullStory',
      },
      category: {
        primaryCategory: 'homepage',
      },
    }
  },
  rules: [
    {
      "id": "fs-event-ceddl-page-omit-convert",
      "description": "convert and send CEDDL page properties to FS.event as a 'Page' event",
      "source": "digitalData.page",
      "operators": [
        {
          "name": "flatten"
        },
        {
          "name": "query",
          "select": "$[!(destinationURL,referringURL)]"
        },
        {
          "name": "convert",
          "properties": "version",
          "type": "real"
        },
        {
          "name": "convert",
          "properties": "issueDate,effectiveDate,expiryDate",
          "type": "date"
        },
        {
          "name": "insert",
          "value": "digitalData.page"
        }
      ],
      "destination": "FS.event"
    }
  ]
};
