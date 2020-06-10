export const nav: ContentToRender = [{
    _name: 'CSidebarNav',
    _children: [
        {
            _name: 'CSidebarNavItem',
            name: 'Dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
            badge: {
                color: 'primary',
                text: 'NEW'
            }
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Tokens']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Issuer',
            // to: '/item',
            icon: 'cil-bank'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Management',
            // to: '/item',
            icon: 'cil-memory'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Wallet',
            // to: '/item',
            icon: 'cil-wallet'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Contracts']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Organizations',
            // to: '/item',
            icon: 'cil-sitemap'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Clients',
            // to: '/item',
            icon: 'cil-people'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'General',
            // to: '/item',
            icon: 'cil-address-book'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['History']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Payments',
            // to: '/item',
            icon: 'cil-credit-card'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Settlement',
            // to: '/item',
            icon: 'cil-layers'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Activity',
            // to: '/item',
            icon: 'cil-flag-alt'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Settings']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Account',
            // to: '/item',
            icon: 'cil-at'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Security',
            // to: '/item',
            icon: 'cil-shield-alt'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Blockchain',
            // to: '/item',
            icon: 'cil-vector'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Account Type']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Basic',
            // to: '/item',
            icon: {
                name: 'cil-circle',
                class: 'text-info'
            },
            label: true
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Issuer',
            // to: '/item',
            icon: {
                name: 'cil-circle',
                class: 'text-warning'
            },
            label: true
        },
    ]
}]