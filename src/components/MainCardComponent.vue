<template>
    <div>
        <CCard :class="[{'main-card-dark':darkMode},'main-card']">
            <CCardHeader class="header">
                {{ title }}
                <slot name="left">

                </slot>
                <slot name="right-action">
                    <CSwitch
                            class="float-right"
                            variant="3d"
                            size="sm"
                            shape="pill"
                            color="info"
                            data-on="on"
                            data-off="Off"
                            :checked="edit"
                            @update:checked="changeEdit"
                    />
                </slot>
            </CCardHeader>
            <CCardBody class="body">
                <div class="bottom-right"></div>
                <slot>Default Content</slot>
            </CCardBody>
        </CCard>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator'

    @Component
    export default class MainCardComponent extends Vue {
        edit = false

        @Prop({type: String, default: 'Default Title'})
        title !: string

        changeEdit(checked: boolean) {
            this.edit = checked

            if (!this.edit) {
                this.$emit('onClose')
            } else {
                this.$emit('onOpen')
            }
        }

        get darkMode(): boolean {
            return this.$store.state.darkMode
        }
    }
</script>

<style lang="stylus" scoped>
    .main-card
        border-left 8px solid rgb(79, 116, 238) !important
        box-shadow 2px 2px 5px #BBBBBB !important
        border-radius 10px

        &-dark
            box-shadow none !important

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
</style>