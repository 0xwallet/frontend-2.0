<template>
    <div>
        <GridLayout
                :layout.sync="layout"
                :key="gridKey"
                :col-number="4"
                :row-height="10"
                :is-draggable="true"
                :is-resizable="true"
                :responsive="true"
                :margin="[10, 10]"
        >
            <GridItem
                    v-for="item in layout"
                    :key="item.i"
                    v-bind="{...item, accent: null }"
                    :min-h="7"
                    :min-w="2"
            >
                <CCard
                        :accent-color="item.accent"
                        class="h-100"
                >
                    <CCardHeader>
                        {{ item.static ? 'Static Card' : `Drag & Drop Card ${item.i}` }}
                    </CCardHeader>
                    <CCardBody class="overflow-auto">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                        nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                    </CCardBody>
                </CCard>
            </GridItem>
        </GridLayout>
    </div>
</template>

<script>
    import {GridLayout, GridItem} from 'vue-grid-layout'

    const baseLayout = [
        {i: '0', x: 0, y: 0, w: 4, h: 16, accent: 'primary'},
        {i: '1', x: 4, y: 0, w: 4, h: 12, accent: 'secondary'},
        {i: '2', x: 8, y: 0, w: 4, h: 12, accent: 'success'},
        {i: '3', x: 0, y: 4, w: 4, h: 12, accent: 'info'},
        {i: '4', x: 4, y: 4, w: 8, h: 12, accent: 'warning'},
        {i: '5', x: 4, y: 8, w: 4, h: 12, accent: 'danger'},
    ]
    const layoutKey = 'CoreUI-Vue-Draggable-Layouts'
    const storedLayout = JSON.parse(localStorage[layoutKey] || null)

    export default {
        name: 'Draggable',
        components: {
            GridLayout,
            GridItem
        },
        data() {
            return {
                layout: storedLayout || baseLayout,
                storedLayout,
                gridKey: 0
            }
        },
        methods: {
            saveGrid() {
                this.storedLayout = this.layout
                localStorage.setItem(layoutKey, JSON.stringify(this.layout))
            },
            resetLayout(type) {
                this.gridKey++
                this.layout = type === 'base' ? baseLayout : this.storedLayout
            }
        }
    }
</script>

<style>
    .vue-grid-item.vue-grid-placeholder {
        background: gray !important;
        border: thin dashed !important;
    }
</style>

