<template>
    <div>
        <div class="back-box" v-show="show" @click="show = !show"></div>

        <div class="message-box" ref="messageBody" v-show="show" style="width: 0px;height: 0px">

        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Watch} from 'vue-property-decorator'
    import {MessageModule} from '@/store/MessageModule'
    import {TimelineLite} from 'gsap'

    @Component
    export default class MessageComponent extends Vue {

        $refs !: {
            messageBody: any
        }

        show = false

        @Watch('show')
        onShowChange(value: boolean) {
            if (!value) {
                MessageModule.showMessageModal(false)
            }
        }

        @Watch('messageModalShow')
        onMessageModalShowChange(value: boolean) {
            if (value) {
                this.show = true
                const {messageBody} = this.$refs
                messageBody.style.left

                const screenWidth = document.body.clientWidth
                const screenHeight = document.documentElement.clientHeight

                const lastWidth = screenWidth * 0.8
                const lastHeight = screenHeight * 0.85
                const lastLeft = (screenWidth - lastWidth) / 2
                const lastTop = (screenHeight - lastHeight) / 2


                const timeline = new TimelineLite()
                timeline.fromTo(messageBody, 0.4, {
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

        get messageModalShow(): boolean {
            return MessageModule.messageModalShow
        }
    }
</script>
<style lang="stylus" scoped>
    .message-box
        background white
        border-radius 10px
        padding 10px
        box-shadow 0 0 5px #cccccc
        position: absolute
        z-index 100001

    .back-box
        z-index 100000
        position: fixed
        width 100%
        height 100%
        background rgba(0, 0, 0, 0.1)
</style>
