import { ComposerProject } from '../models/project';

export const transactionProject: ComposerProject = {
  variable: 'digitalData',
  datalayer: {
    transaction: {
      transactionID: 'tr-235098236',
      profile: {
        profileInfo: {
          profileID: 'pr-12333211',
          userName: 'JohnyAppleseed',
        },
        address: {
          line1: '123 Easy St.',
          line2: '',
          city: 'Athens',
          stateProvince: 'GA',
          postalCode: '30606',
          country: 'USA',
        },
        shippingAddress: {
          line1: '123 Easy St.',
          line2: '',
          city: 'Athens',
          stateProvince: 'GA',
          postalCode: '30606',
          country: 'USA',
        },
      },
      total: {
        basePrice: 15.55,
        voucherCode: '',
        voucherDiscount: 0,
        currency: 'USD',
        taxRate: 0.09,
        shipping: 5.0,
        shippingMethod: 'UPS-Ground',
        priceWithTax: 16.95,
        transactionTotal: 16.95,
      },
      attributes: {},
      item: [{
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
        category: { primaryCategory: 'fruit' },
        price: {
          basePrice: 15.55,
          voucherCode: '',
          voucherDiscount: 0,
          currency: 'USD',
          taxRate: 0.09,
          shipping: 5.0,
          shippingMethod: 'UPS-Ground',
          priceWithTax: 16.95,
        },
        quantity: 1,
        linkedProduct: [],
        attributes: {},
      }],
    },
  },
  rules: [
    {
      "id": "fs-event-ceddl-transaction-id-total",
      "description": "send CEDDL transaction's transactionID and total properties to FS.event as a 'Order Completed' event",
      "source": "digitalData.transaction[(transactionID,total)]",
      "operators": [
        {
          "name": "flatten"
        },
        {
          "name": "insert",
          "value": "Order Completed"
        }
      ],
      "destination": "FS.event"
    }
  ]
};
