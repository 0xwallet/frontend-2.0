<template>
    <CCard class="apps">
        <CCardHeader class="header">Apps
            <CButton class="btn btn-pill btn-ghost-info">Create new app</CButton>
        </CCardHeader>
        <CCardBody class="body">
            <div class="bottom-right"></div>
            <div class="app-items">
                <div class="app-item" v-for="(app,index) in apps" :key="index">
                    <div class="bottom-right"></div>
                    <div class="left-border"></div>
                    <div> {{ app.name }}</div>
                </div>
            </div>
        </CCardBody>
    </CCard>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class AccountApps extends Vue {
        apps = [
            {name: 'test'},
            {name: 'test2'},
            {name: 'User\'s default app'},
        ]
    }
</script>

<style lang="stylus" scoped>
    .apps
        border-left 8px solid rgb(79, 116, 238) !important
        box-shadow 2px 2px 5px #BBBBBB !important
        border-radius 10px

        .bottom-right
            height 23px
            width 23px
            background rgb(79, 116, 238)
            right 0
            bottom 0
            position absolute
            border-bottom-right-radius 10px
            border-top-left-radius 6px

        .header
            border-top-right-radius 10px
            border-top-left-radius 10px
            padding-left 40px !important
            font-size 20px

            .btn
                float right

        .body
            .app-items
                display flex
                flex-wrap wrap
                padding-left 6%
                padding-right 6%
                padding-bottom 50px
                justify-content space-between

                .app-item
                    width 48%
                    height 100px
                    background rgb(247, 247, 247)
                    box-shadow 0 2px 5px #ababab
                    border-radius 15px
                    margin-top 25px
                    padding 18px
                    padding-left 30px
                    position relative

                    .left-border
                        width 12px
                        height 100%
                        background white
                        position: absolute;
                        border-top-left-radius 20px
                        border-bottom-left-radius 20px
                        box-shadow 0 2px 5px #cdcdcc
                        left 0
                        top 0

                    .bottom-right
                        height 23px
                        width 23px
                        background white
                        right 0
                        bottom 0
                        position absolute
                        border-bottom-right-radius 10px
                        box-shadow -1px -1px 5px #cdcdcd
                        border-top-left-radius 6px
</style>