<template>
    <main-card-component :title="$t('account.apps.apps')" class="apps">
        <CButton slot="right-action" class="btn-right btn-pill btn-ghost-info">{{ $t('account.apps.create_new_app') }}
        </CButton>
        <main-card-item-component @onClick="onItemClick" :items="apps"></main-card-item-component>
    </main-card-component>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainCardComponent from '@/components/MainCardComponent.vue'
    import MainCardItemComponent from '@/components/MainCardItemComponent.vue'

    @Component({
        components: {MainCardItemComponent, MainCardComponent}
    })
    export default class AccountApps extends Vue {

        apps = [
            {name: 'test'},
            {name: 'test2'},
            {name: 'User\'s default app'},
        ]

        onItemClick(item: any) {
            console.log(item)
        }

    }
</script>

<style lang="stylus" scoped>
    .apps
        .btn-right
            float right

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

                &-dark
                    background #181924 !important

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

                    &-dark
                        background #4f74ee !important

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

                    &-dark
                        background #4f74ee !important
</style>