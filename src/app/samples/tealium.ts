import { ComposerProject } from '../models/project';

export const tealiumRetailProject: ComposerProject = {
  variable: 'utag.data',
  datalayer: {
    tealium_event: '_CHANGE_ME_',
    brand_name: 'Ralph Lauren',
    browse_refine_type: ['Size'],
    browse_refine_value: ['XL'],
    cart_product_id: ['PROD123'],
    cart_product_price: ['12.99'],
    cart_product_quantity: ['2'],
    cart_product_sku: ['PR-RED-1234'],
    cart_total_items: '4',
    cart_total_value: '77.96',
    category_id: '243',
    category_name: 'Shoes: Boots',
    country_code: 'us',
    customer_city: 'San Diego',
    customer_country: 'United States',
    customer_email: 'user@example.com',
    customer_first_name: 'John',
    customer_id: '8237572',
    customer_last_name: 'Smith',
    customer_postal_code: '92101',
    customer_state: 'CA',
    language_code: 'en',
    link_category: 'Header',
    link_name: 'Login',
    order_currency_code: 'USD',
    order_discount_amount: '10.00',
    order_id: 'ORD123456',
    order_merchandise_total: '55.98',
    order_payment_type: 'paypal',
    order_promo_code: 'SPRFREE,PROMO10',
    order_shipping_amount: '6.99',
    order_shipping_type: 'UPS',
    order_store: 'mobile web',
    order_subtotal: '45.98',
    order_tax_amount: '2.50',
    order_total: '54.47',
    order_type: 'email',
    page_name: 'Homepage',
    page_type: 'product',
    product_brand: ['Ralph Lauren'],
    product_category: ['Shirts'],
    product_discount_amount: ['2.98'],
    product_id: ['PROD123', 'PROD456'],
    product_image_url: ['//domain.com/123.gif'],
    product_name: ['Product One'],
    product_on_page: ['PROD123'],
    product_original_price: ['29.99'],
    product_price: ['12.99'],
    product_promo_code: ['SHIRT10OFF'],
    product_quantity: ['2'],
    product_sku: ['PR-RED-1234'],
    product_subcategory: ['T-Shirts'],
    product_url: ['//domain.com/123.html'],
    search_keyword: 'cargo',
    search_results: '42',
    site_section: 'Clothing',
  },
  rules: [
    {
      "id": "fs-tealium-event",
      "description": "Send Tealium data (except for customer personal details) for FS.event. See https://community.tealiumiq.com/t5/Data-Layer/Data-Layer-Definition-Retail/ta-p/17227.",
      "source": "utag.data[^(brand_,browse_,cart_,category_,customer_,language_,page_,product_,search_,site_,tealium_event)]",
      "operators": [
        {
          "name": "query",
          "select": "$[?(tealium_event)]"
        },
        {
          "name": "query",
          "select": "$[!(customer_email,customer_first_name,customer_last_name)]"
        },
        {
          "name": "convert",
          "properties": "cart_product_quantity,cart_total_items,product_quantity,search_results",
          "type": "int"
        },
        {
          "name": "convert",
          "properties": "cart_product_price,cart_total_value,order_discount_amount,order_merchandise_total,order_shipping_amount,order_subtotal,order_tax_amount,order_total,product_discount_amount,product_original_price,product_price",
          "type": "real"
        },
        {
          "name": "insert",
          "select": "tealium_event"
        }
      ],
      "destination": "FS.event",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-tealium-user-registration",
      "description": "See https://community.tealiumiq.com/t5/Data-Layer/Data-Layer-Definition-Retail/ta-p/17227#toc-hId-867970954.",
      "source": "utag.data[?(tealium_event=user_registration)]",
      "operators": [
        {
          "select": "$[^(customer_)]",
          "name": "query"
        },
        {
          "name": "rename",
          "properties": {
            "customer_first_name": "displayName",
            "customer_email": "email"
          }
        },
        {
          "name": "insert",
          "select": "customer_id"
        }
      ],
      "destination": "FS.identify",
      "readOnLoad": true,
      "monitor": true
    },
    {
      "id": "fs-tealium-user-update",
      "description": "See https://community.tealiumiq.com/t5/Data-Layer/Data-Layer-Definition-Retail/ta-p/17227#toc-hId-1755474635.",
      "source": "utag.data[?(tealium_event=user_update)]",
      "operators": [
        {
          "name": "query",
          "select": "$[^(customer_)]"
        }
      ],
      "destination": "FS.setUserVars",
      "readOnLoad": true,
      "monitor": true
    }
  ]
}
