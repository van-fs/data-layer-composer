import { ComposerProject } from '../models/project';

export const ceddlProject: ComposerProject = {
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
    },
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
    },
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
    }],
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
    user: {
      segment: {},
      profile: [{
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
        social: {},
        attributes: {},
      }],
    }
  },
  rules: [
    {
      "id": "fs-event-ceddl-cart-convert",
      "description": "converts and sends CEDDL cart properties to FS.event",
      "source": "digitalData.cart",
      "operators": [
        {
          "name": "query",
          "select": "$[!(item)]"
        },
        {
          "name": "flatten"
        },
        {
          "name": "convert",
          "properties": "basePrice,voucherDiscount,taxRate,shipping,priceWithTax,cartTotal",
          "type": "real"
        },
        {
          "name": "insert",
          "value": "cart"
        }
      ],
      "destination": "FS.event"
    },
    {
      "id": "fs-event-ceddl-page",
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
          "value": "page"
        }
      ],
      "destination": "FS.event"
    },
    {
      "id": "fs-event-ceddl-product",
      "description": "sends the CEDDL product to FS.event",
      "source": "digitalData.product[0]",
      "operators": [
        {
          "name": "query",
          "select": "$[!(linkedProduct)]"
        },
        {
          "name": "flatten"
        },
        {
          "name": "insert",
          "value": "product"
        }
      ],
      "destination": "FS.event"
    },
    {
      "id": "fs-event-ceddl-transaction",
      "description": "send CEDDL transaction to FS.event",
      "source": "digitalData.transaction",
      "operators": [
        {
          "name": "query",
          "select": "$[!(profile,item)]"
        },
        {
          "name": "flatten"
        },
        {
          "name": "convert",
          "properties": "basePrice,voucherDiscount,taxRate,shipping,priceWithTax,transactionTotal",
          "type": "real"
        },
        {
          "name": "insert",
          "value": "transaction"
        }
      ],
      "destination": "FS.event"
    },
    {
      "id": "fs-uservars-ceddl-user-all",
      "description": "send all CEDDL user properties to FS.setUserVars",
      "source": "digitalData.user.profile[0]",
      "operators": [
        {
          "name": "flatten"
        }
      ],
      "destination": "FS.setUserVars"
    },
    {
      "id": "fs-identify-ceddl-user-all",
      "description": "send all CEDDL user properties to FS.identify using the profileID as the FullStory uid",
      "source": "digitalData.user.profile[0]",
      "operators": [
        {
          "name": "flatten"
        },
        {
          "name": "insert",
          "select": "profileID"
        }
      ],
      "destination": "FS.identify"
    },
  ]
};
