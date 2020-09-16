import { ComposerProject } from '../models/project';

export const productProject: ComposerProject = {
  variable: 'digitalData',
  datalayer: {
    product: [{
      productInfo: {
        productID: '668ebb86-60b5-451e-92d3-044157d27823',
        productName: 'Cosmic Crisp Apple',
        description: 'A crisp and cosmic apple',
        productURL: 'https://fruitshoppe.firebaseapp.com/product/668ebb86-60b5-451e-92d3-044157d27823',
        productImage: 'https://fruitshoppe.firebaseapp.com/product/668ebb86-60b5-451e-92d3-044157d27823/image',
        productThumbnail: 'https://fruitshoppe.firebaseapp.com/product/668ebb86-60b5-451e-92d3-044157d27823/thumbnail',
        manufacturer: 'Washington State Apple Farm',
        sku: 'cca-1234',
        color: 'red and white',
        size: 'medium',
      },
      category: {
        primaryCategory: 'fruit',
      },
      linkedProduct: [],
    }]
  },
  rules: [
    {
      "id": "fs-event-ceddl-product",
      "description": "send the latest CEDDL product's primaryCategory, sku, productID, and productName properties to FS.event as a 'View Product' event",
      "source": "digitalData.product[-1]",
      "operators": [
        {
          "name": "flatten"
        },
        {
          "name": "query",
          "select": "$[(primaryCategory, sku, productID, productName)]"
        },
        {
          "name": "insert",
          "value": "View Product"
        }
      ],
      "destination": "FS.event"
    }
  ]
};
