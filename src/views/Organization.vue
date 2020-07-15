<template>
    <div>
        <CTabs>
            <CTab title="Calendar" active>
                <calendar></calendar>
            </CTab>
            <CTab title="Display Board">
                <display-board></display-board>
            </CTab>
        </CTabs>

        <CCardGroup class="mb-4">
            <CWidgetProgressIcon
                    header="87.500"
                    text="Visitors"
                    color="gradient-info"
            >
                <CIcon name="cil-people" height="36"/>
            </CWidgetProgressIcon>
            <CWidgetProgressIcon
                    header="385"
                    text="New Clients"
                    color="gradient-success"
            >
                <CIcon name="cil-userFollow" height="36"/>
            </CWidgetProgressIcon>
            <CWidgetProgressIcon
                    header="1238"
                    text="Products sold"
                    color="gradient-warning"
            >
                <CIcon name="cil-basket" height="36"/>
            </CWidgetProgressIcon>
            <CWidgetProgressIcon
                    header="28%"
                    text="Returning Visitors"
            >
                <CIcon name="cil-chartPie" height="36"/>
            </CWidgetProgressIcon>
        </CCardGroup>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import Calendar from '@/views/organization/OrganizationCalendar.vue'
    import DisplayBoard from '@/views/organization/OrganizationDisplayBoard.vue'

    @Component({
        components: {
            Calendar,
            DisplayBoard
        }
    })
    export default class Organization extends Vue {

        mounted() {
            setTimeout(() => {
                CommonModule.hidePageLoading()
            }, 1000)
        }

    }
</script>

<style lang="stylus" scoped>

</style>