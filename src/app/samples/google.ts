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
      event: 'productClick',
      ecommerce: {
        click: {
          actionField: { action: 'click', list: 'Search Results' },
          products: [
            {
              name: 'Heritage Huckleberries',
              id: 'P000525722',
              price: '2.99',
              brand: 'Heritage',
              category: 'homepage product recs',
              variant: '',
              position: 1,
            },
          ],
        },
      },
      eventCallback() {
        console.log('Callback called');
      },
    },
    {
      ecommerce: {
        detail: {
          actionField: { action: 'detail', list: 'Product Gallery' },
          products: [
            {
              name: 'Heritage Huckleberries',
              id: 'P000525722',
              price: '2.99',
              brand: 'Heritage',
              category: 'product gallery',
              variant: '',
            },
          ],
        },
      },
    },
    {
      event: 'addToCart',
      ecommerce: {
        currencyCode: 'USD',
        add: {
          actionField: { action: 'add' },
          products: [
            {
              name: 'Heritage Huckleberries',
              id: 'P000525722',
              price: '2.99',
              brand: 'Heritage',
              category: 'product',
              variant: '',
              quantity: 2,
            },
          ],
        },
      },
    },
    {
      event: 'removeFromCart',
      ecommerce: {
        currencyCode: 'USD',
        remove: {
          actionField: { action: 'remove' },
          products: [
            {
              name: 'Heritage Huckleberries',
              id: 'P000525722',
              price: '2.99',
              brand: 'Heritage',
              category: 'product',
              variant: '',
              quantity: 1,
            },
          ],
        },
      },
    },
    {
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
      event: 'promotionClick',
      ecommerce: {
        promoClick: {
          actionField: { action: 'promo_click' },
          promotions: [
            {
              id: '1004-Blueberries123321',
              name: 'Fruits',
              creative: 'Blueberries123321',
              position: 'Feature',
            },
          ],
        },
      },
      eventCallback() {
        console.log('Callback called');
      },
      'gtm.uniqueEventId': 6,
    },
    {
      event: 'checkout',
      ecommerce: {
        checkout: {
          actionField: {
            action: 'checkout',
            step: 1,
            option: 'Visa',
          },
          products: [
            {
              name: 'Heritage Huckleberries',
              id: 'P000525722',
              price: '2.99',
              brand: 'Heritage',
              category: 'fruit',
              variant: '',
              quantity: 1,
            },
          ],
        },
      },
      eventCallback() {
        console.log('Callback called');
      },
    },
    {
      ecommerce: {
        purchase: {
          actionField: {
            action: 'purchase',
            id: 'T12345',
            affiliation: 'Online Store',
            revenue: '35.43',
            tax: '4.90',
            shipping: '5.99',
            coupon: '',
          },
          products: [
            {
              name: 'Heritage Huckleberries',
              id: 'P000525722',
              price: '2.99',
              brand: 'Heritage',
              category: 'fruit',
              variant: '',
              quantity: 1,
              coupon: '',
            },
          ],
        },
      },
    },
    {
      ecommerce: {
        refund: {
          actionField: {
            action: 'refund',
            id: 'T12345',
          },
          products: [
            {
              id: 'P000525722',
              quantity: 1,
            },
          ],
        },
      },
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
      "id": "fs-ga-pageview",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$[?(pageType, pageName)]" },
        { "name": "insert", "value": "pageview" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-detail-action",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.detail.actionField" },
        { "name": "convert", "properties": "revenue,tax,shipping", "type": "real" },
        { "name": "convert", "properties": "step", "type": "int" },
        { "name": "insert", "value": "detail" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-detail-product",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.detail.products[0]" },
        { "name": "convert", "properties": "price", "type": "real" },
        { "name": "convert", "properties": "quantity,position", "type": "int" },
        { "name": "insert", "value": "detail_product" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-click-action",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.click.actionField" },
        { "name": "convert", "properties": "revenue,tax,shipping", "type": "real" },
        { "name": "convert", "properties": "step", "type": "int" },
        { "name": "insert", "value": "click" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-click-product",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.click.products[0]" },
        { "name": "convert", "properties": "price", "type": "real" },
        { "name": "convert", "properties": "quantity,position", "type": "int" },
        { "name": "insert", "value": "click_product" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-add-action",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.add.actionField" },
        { "name": "convert", "properties": "revenue,tax,shipping", "type": "real" },
        { "name": "convert", "properties": "step", "type": "int" },
        { "name": "insert", "value": "add" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-add-product",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.add.products[0]" },
        { "name": "convert", "properties": "price", "type": "real" },
        { "name": "convert", "properties": "quantity,position", "type": "int" },
        { "name": "insert", "value": "add_product" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-remove-action",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.remove.actionField" },
        { "name": "convert", "properties": "revenue,tax,shipping", "type": "real" },
        { "name": "convert", "properties": "step", "type": "int" },
        { "name": "insert", "value": "remove" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-remove-product",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.remove.products[0]" },
        { "name": "convert", "properties": "price", "type": "real" },
        { "name": "convert", "properties": "quantity,position", "type": "int" },
        { "name": "insert", "value": "remove_product" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-promo_click-action",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.promoClick.actionField" },
        { "name": "convert", "properties": "revenue,tax,shipping", "type": "real" },
        { "name": "convert", "properties": "step", "type": "int" },
        { "name": "insert", "value": "promo_click" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-promo_click-promotion",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.promoClick.promotions[0]" },
        { "name": "insert", "value": "promo_click_promotion" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-checkout-action",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.checkout.actionField" },
        { "name": "convert", "properties": "revenue,tax,shipping", "type": "real" },
        { "name": "convert", "properties": "step", "type": "int" },
        { "name": "insert", "value": "checkout" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-checkout-product",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.checkout.products" },
        { "name": "fan-out" },
        { "name": "convert", "properties": "price", "type": "real" },
        { "name": "convert", "properties": "quantity,position", "type": "int" },
        { "name": "insert", "value": "checkout_product" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-purchase-action",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.purchase.actionField" },
        { "name": "convert", "properties": "revenue,tax,shipping", "type": "real" },
        { "name": "convert", "properties": "step", "type": "int" },
        { "name": "insert", "value": "purchase" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-purchase-product",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.purchase.products" },
        { "name": "fan-out" },
        { "name": "convert", "properties": "price", "type": "real" },
        { "name": "convert", "properties": "quantity,position", "type": "int" },
        { "name": "insert", "value": "purchase_product" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-refund-action",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.refund.actionField" },
        { "name": "convert", "properties": "revenue,tax,shipping", "type": "real" },
        { "name": "convert", "properties": "step", "type": "int" },
        { "name": "insert", "value": "refund" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-e-commerce-refund-product",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$.ecommerce.refund.products" },
        { "name": "fan-out" },
        { "name": "convert", "properties": "price", "type": "real" },
        { "name": "convert", "properties": "quantity,position", "type": "int" },
        { "name": "insert", "value": "refund_product" }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-ga-user-vars",
      "source": "dataLayer",
      "operators": [
        { "name": "query", "select": "$[?(userProfile)]" },
        { "name": "flatten"},
        { "name": "query", "select": "$[?(userId!=-1)]" },
        { "name": "insert", "select": "userId" }
      ],
      "destination": "FS.setUserVars",
      "readOnLoad": true,
      "monitor": true
    }
  ]
}
