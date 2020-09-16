import { ComposerProject } from '../models/project';

export const cartProject: ComposerProject = {
  variable: 'digitalData',
  datalayer: {
    cart: {
      cartID: 'cart-1234',
      price: {
        basePrice: 15.55,
        voucherCode: '',
        voucherDiscount: 0,
        currency: 'USD',
        taxRate: 0.09,
        shipping: 5.0,
        shippingMethod: 'UPS-Ground',
        priceWithTax: 16.95,
        cartTotal: 21.95,
      },
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
      attributes: {},
    }
  },
  rules: [
    {
      "id": "fs-event-ceddl-cart",
      "description": "send CEDDL cart's cartID and price properties to FS.event as a 'View Cart' event",
      "source": "digitalData.cart[(cartID,price)]",
      "operators": [
        {
          "name": "insert",
          "value": "View Cart"
        }
      ],
      "destination": "FS.event"
    },
    {
      "id": "fs-event-ceddl-cart-not-items",
      "description": "send CEDDL cart properties except items list to FS.event as a 'View Cart' event",
      "source": "digitalData.cart",
      "operators": [
        {
          "name": "query",
          "select": "$[!(items)]"
        },
        {
          "name": "insert",
          "value": "View Cart"
        }
      ],
      "destination": "FS.event"
    },
    {
      "id": "fs-event-ceddl-cart-convert",
      "description": "converts and sends CEDDL cart properties to FS.event as a 'View Cart' event",
      "source": "digitalData.cart",
      "operators": [
        {
          "name": "flatten"
        },
        {
          "name": "convert",
          "properties": "basePrice,priceWithTax,cartTotal",
          "type": "real"
        },
        {
          "name": "insert",
          "value": "View Cart"
        }
      ],
      "destination": "FS.event"
    }
  ]
};
