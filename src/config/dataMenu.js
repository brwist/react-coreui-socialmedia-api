import { faVirus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faShopify } from "@fortawesome/free-brands-svg-icons"

export default [
  {
    title: 'COVID Message',
    message: ['Back to Business', 'Safety Measures', 'Customer Protocols', 'Social Distancing', 'COVID-19 Product Stories', 'We are now OPEN'],
    icon: faVirus,
    article: 'fa'
  },
  {
    title: 'Promote a Product (Shopify)',
    message: ['Visualize your products in store', 'Showcase a new collection', 'Highlight discounted Products'],
    icon: faShopify,
    article: 'fa'
  },
  {
    title: 'Promote a Brand Story',
    message: ['Showcase popular IG stories', 'How the product is made', 'Customers Reviews', 'Brand Videos & Images', 'COVID-19 Stories'],
    icon: 'fab fa-instagram',
    article: 'fab'
  },
  {
    title: 'Custom Message',
    message: ['Custom store specific messaging', 'Upload your own assets'],
    icon: faEdit,
    article: 'fa'
  }
]
