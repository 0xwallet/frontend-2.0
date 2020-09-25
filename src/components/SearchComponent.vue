<template>
    <div>
        <div class="search-box" ref="searchBody" v-show="show">
            <div style="font-size: 24px;color: #999999;padding: 0 15px;">Spot Light</div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {SearchModule} from '@/store/SearchModule'
    import {Watch} from 'vue-property-decorator'
    import {TimelineLite} from 'gsap'
    import {MessageModule} from '@/store/MessageModule'

    @Component
    export default class SearchComponent extends Vue {

        $refs !: {
            searchBody: any
        }

        show = false

        @Watch('show')
        onShowChange(value: boolean) {
            if (!value) {
                SearchModule.showSearchModal(false)

            }
        }

        @Watch('searchModalShow')
        onSearchModalShowChange(value: boolean) {
            if (value) {
                this.show = true

                const {searchBody} = this.$refs
                searchBody.style.left

                const screenWidth = document.body.clientWidth
                const screenHeight = document.documentElement.clientHeight

                const lastWidth = 700
                const lastHeight = 60
                const lastLeft = (screenWidth - lastWidth) / 2
                const lastTop = (screenHeight - lastHeight) / 4


                const timeline = new TimelineLite()
                timeline.fromTo(searchBody, 0.4, {
                    x        : MessageModule.msgIconPosition.left,
                    y        : MessageModule.msgIconPosition.top,
                    width    : 0,
                    height   : 0,
                    rotationY: 0, transformOrigin: 'left top'
                }, {
                    x        : lastLeft,
                    y        : lastTop,
                    width    : lastWidth,
                    height   : lastHeight,
                    rotationY: 360, transformOrigin: 'left top'
                })

            }
        }

        get searchModalShow(): boolean {
            return SearchModule.searchModalShow
        }
    }
</script>

<style lang="stylus" scoped>
    .search-box
        background white
        border-radius 10px
        padding 10px
        box-shadow 0 0 5px #cccccc
        position: absolute
        z-index 100001
        height 60px
        width 700px
</style>