<template>
    <CBreadcrumb v-bind="props">
        <slot></slot>
    </CBreadcrumb>
</template>

<script>
    import CBreadcrumb from '@coreui/vue/src/components/breadcrumb/CBreadcrumb'

    export default {
        name: 'MyCBreadcrumbRouter',
        components: {
            CBreadcrumb
        },
        props: {
            addClasses: [String, Array, Object],
            addLinkClasses: [String, Array, Object],
            addLastItemClasses: [String, Array, Object]
        },
        computed: {
            items() {
                const routes = this.$route.matched.filter(route => {
                    return route.name || (route.meta && route.meta.label)
                })
                const items = []
                let isDrive = false
                routes.map(route => {
                    const meta = route.meta || {}
                    if (route.path === '/drive/metanet/:txId') {
                        isDrive = true
                    }
                    items.push({
                        to: route,
                        text: this.$t(meta.label || route.name)
                    })
                })
                if (isDrive) {
                    let paramString  = this.$route.params.txId
                    let params = paramString.split(".")
                    params.map((item,index) => {
                        if (index !== 0) {
                            items.push({
                                text: item
                            })
                        }
                    })

                }
                return items
            },
            props() {
                return {
                    items: this.items,
                    addClasses: this.addClasses,
                    addLinkClasses: this.addLinkClasses,
                    addLastItemClasses: this.addLastItemClasses
                }
            }
        }
    }
</script>
