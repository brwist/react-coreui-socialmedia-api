import logo from '../assets/logo.png';
import links from '../config/index';
import './nav.scss';

export default {
  items: [
    {
      title: true,
      url: '/',
      icon: { logo },
      class: 'title-logo',
      wrapper: {
        element: 'div',
        attributes: {

        }
      }
    },
    {
      name: 'My lightbox',
      url: '/#',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Panel Editor',
          url: '/editor',
          icon: 'icon-screen-smartphone',
        },
        {
          name: 'Analytics',
          url: links.analytics,
          icon: 'icon-chart',
        }
      ],
    },
    {
      name: 'Create a Story',
      // url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Promote a Product',
          url: links.promote,
          icon: 'icon-speech',
        },
        {
          name: 'COVID-19 Message',
          url: '/covid',
          icon: 'icon-shield',
        },
        {
          name: 'Promote a Brand Stor',
          url: links.brand,
          icon: 'icon-envelope-open',
        },
        {
          name: 'Company Announcement',
          url: links.companyAnnoun,
          icon: 'icon-envelope-letter',
        },
        {
          name: 'Department Announcem',
          url: links.departmentAnnoun,
          icon: 'icon-envelope-open',
        },
        {
          name: 'Custom Message',
          url: '/custom-message',
          icon: 'icon-book-open',
        },
        {
          name: 'Promotional Message',
          url: '/promotion-message',
          icon: 'icon-cursor',
        },
        {
          name: 'Lunch Menu',
          url: '/lunch-menu',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Account Setup',
      url: links.setup,
      icon: 'icon-note',
    },
    {
      name: 'Workflow tools',
      url: '/work-flow',
      icon: 'icon-star',
    },
    {
      name: 'Support',
      url: links.support,
      icon: 'icon-settings'
    },
    {
      name: 'Log Out',
      url: links.login,
      icon: 'icon-logout',
      variant: '#23282c',
      class: 'log-out',
      // attributes: { target: '_blank', rel: "noopener" },
    },
  ]
}
