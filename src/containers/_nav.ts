import VueI18n from 'vue-i18n'

export const nav = ($i18n: VueI18n): ContentToRender => {
    return [{
        _name    : 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.dashboard'),
                to   : '/dashboard',
                icon : 'cil-speedometer',
                badge: {
                    color: 'primary',
                    text : 'NEW'
                }
            },
            {
                _name    : 'CSidebarNavTitle',
                _children: [$i18n.t('nav.token') + '']
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.issuer'),
                // to: '/item',
                icon : 'cil-bank'
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.management'),
                // to: '/item',
                icon : 'cil-memory'
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.wallet'),
                // to: '/item',
                icon : 'cil-wallet'
            },
            {
                _name    : 'CSidebarNavTitle',
                _children: [$i18n.t('nav.contact') + '']
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.organizations'),
                to   : '/organization',
                icon : 'cil-sitemap'
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.clients'),
                // to: '/item',
                icon : 'cil-people'
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.general'),
                // to: '/item',
                icon : 'cil-address-book'
            },
            {
                _name    : 'CSidebarNavTitle',
                _children: [$i18n.t('nav.history') + '']
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.payments'),
                // to: '/item',
                icon : 'cil-credit-card'
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.settlement'),
                // to: '/item',
                icon : 'cil-layers'
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.activity'),
                // to: '/item',
                icon : 'cil-flag-alt'
            },
            {
                _name    : 'CSidebarNavTitle',
                _children: [$i18n.t('nav.general') + '']
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.account'),
                to   : '/account',
                icon : 'cil-at'
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.security'),
                to   : '/security',
                icon : 'cil-shield-alt'
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.blockchain'),
                to   : '/drive/metanet/be8f08d7f519eb863a68cf292ca51dbab7c9b49f50a96d1232db32e432db3634',
                icon : 'cil-speedometer'
            },
            {
                _name    : 'CSidebarNavTitle',
                _children: [$i18n.t('nav.account_type') + '']
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.basic'),
                // to: '/item',
                icon : {
                    name : 'cil-circle',
                    class: 'text-info'
                },
                label: true
            },
            {
                _name: 'CSidebarNavItem',
                name : $i18n.t('nav.issuer'),
                // to: '/item',
                icon : {
                    name : 'cil-circle',
                    class: 'text-warning'
                },
                label: true
            },
        ]
    }]
}