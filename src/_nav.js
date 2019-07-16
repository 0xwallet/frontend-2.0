export default {
  items: [
    {
      name: 'Overview',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'TOKENS',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Issuer',
      url: '/tokens/issuer',
      icon: 'fa fa-certificate',
    },
    {
      name: 'Management',
      url: '/tokens/management',
      icon: 'fa fa-gears',
    },
    {
      name : 'Wallet',
      url : '/tokens/wallet',
      icon : 'icon-wallet',
    },
    {
      title : true,
      name : 'Contacts'
    },
    {
      name: 'Organizations',
      url: '/contacts/organizations',
      icon: 'fa fa-sitemap',
    },
    {
      name: 'Clients',
      url: '/contacts/clients',
      icon: 'fa fa-users',
    },
    {
      name : 'General',
      url : '/contacts/General',
      icon : 'fa fa-address-book-o',
    },
    {
      title : true,
      name : 'History'
    },
    {
      name: 'Payments',
      url: '/history/payments',
      icon: 'fa fa-credit-card',
    },
    {
      name: 'Settlement',
      url: '/history/settlement',
      icon: 'icon-layers',
    },
    {
      name : 'Activity',
      url : '/history/activity',
      icon : 'fa fa-exchange',
    },
    {
      title : true,
      name : 'Settings'
    },
    {
      name: 'Account',
      url: '/Settings/account',
      icon: 'fa fa-at',
    },
    {
      name: 'Security',
      url: '/Settings/security',
      icon: 'fa fa-shield',
    },
    {
      name : 'Blockchain',
      url : '/Settings/blockchain',
      icon : 'icon-globe',
    },
    {
      divider: true,
      class: 'm-2'
    },
    {
      title: true,
      name: 'Account Type'
    },
    {
      name: 'Basic',
      url: '',
      icon: 'fa fa-circle',
      label: {
        variant: 'danger'
      },
    },
    {
      name: 'Issuer',
      url: '',
      icon: 'fa fa-circle',
      label: {
        variant: 'warning'
      }
    },
  ]
};
