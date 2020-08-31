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
                const path = this.$route.path
                const paths = path.split("/")
                paths.shift()
                paths.shift()
                routes.map(route => {
                    const meta = route.meta || {}
                    items.push({
                        to: route,
                        text: this.$t(meta.label || route.name)
                    })
                })
                paths.map(route => {
                    if (route !== '') {
                        items.push({
                            to: route,
                            text: route
                        })
                    }
                })
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
