<template>
    <div>
        <code style="color: black" v-if="active">
            {{ hash }}
        </code>
        <div style="display: flex">
            <code style="color: black" v-if="!active">
                {{ hash.slice(0,2) }}
            </code>
            <div v-if="!active" class="color-box">
                <div v-for="i in 10" :key="i" :style="{'background-color':'#' + hash.slice(2+6*(i-1),2 + 6 * i)}"></div>
            </div>
            <code style="color: black" v-if="!active">
                {{ hash.slice(hash.length-2,hash.length) }}
            </code>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator'

    @Component
    export default class HashComponent extends Vue {

        @Prop({
            type    : String,
            required: true
        }) hash !: string

        @Prop({
            type   : Boolean,
            default: false
        }) active !: boolean
    }
</script>

<style lang="stylus" scoped>
.color-box
    display flex
    margin-top 4px
    div
        width 6px
        height 10px

</style>