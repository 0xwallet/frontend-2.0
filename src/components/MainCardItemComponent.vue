<template>
    <div class="items">
        <div @click="onClick(item)" :class=" [{ 'item-dark':darkMode},'item']" v-for="(item,index) in items"
             :key="index">
            <div :class="[{'bottom-right-dark':darkMode},'bottom-right']"></div>
            <div :class="[{'left-border-dark':darkMode},'left-border']"></div>
            <div class="item-text" v-html="item.name"></div>
        </div>
        <div v-if="items.length === 0">

        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator'

    @Component
    export default class MainCardItemComponent extends Vue {

        @Prop({
            type   : Array,
            default: []
        })
        items !: Array<any>

        get darkMode(): boolean {
            return this.$store.state.darkMode
        }

        onClick(item: any) {
            this.$emit('onClick', item)
        }

        mounted() {
            console.log(this.items)
        }
    }
</script>

<style lang="stylus" scoped>

    .items
        display flex
        flex-wrap wrap
        padding-left 6%
        padding-right 6%
        padding-bottom 50px
        justify-content space-between

        .item
            width 48%
            height 100px
            background rgb(247, 247, 247)
            box-shadow 0 2px 5px #ababab
            border-radius 15px
            margin-top 25px
            padding 18px
            line-height 64px
            padding-left 30px
            position relative

            &-dark
                background #181924 !important
                box-shadow none

            .item-text
                text-overflow ellipsis
                white-space nowrap
                overflow hidden

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
                    box-shadow none

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