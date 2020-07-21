<template>
    <div>
        <main-card-component :title="$t('drive.files.title')">
            <div slot="right-action">

            </div>
            <div>
                <div v-for="(file,index) in files" :key="index" class="files" @mouseenter="mouseOver(file)"
                     @mouseleave="mouseOut(file)">
                    <div class="name">
                        <div class="image-box">
                            <CImg class="image" v-if="file.dir"
                                  :src="require('@/assets/images/icon/drive/dir.png')"></CImg>
                        </div>
                        <div class="text">{{ file.name }}</div>
                    </div>
                    <div class="option" v-if="file.active">
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.clock')" name="cil-lock-locked"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.info')" name="cil-info"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.edit')" name="cil-pencil"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.copy')" name="cil-paperclip"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.download')" name="cil-cloud-download"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.upload')" name="cil-cloud-upload"></CIcon>
                        </div>
                        <div>
                            <CIcon v-c-tooltip.hover="$t('drive.files.delete')" class="delete"
                                   name="cil-trash"></CIcon>
                        </div>
                    </div>
                    <div class="size">{{ file.getSize() }}</div>
                    <div class="time">
                        <code>
                            {{ file.createTime }}
                        </code>
                    </div>
                </div>
            </div>
        </main-card-component>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainCardComponent from '../../components/MainCardComponent.vue'
    import {Matter} from '@/store/model/EyeBlue'
    import moment from 'moment'

    @Component({
        components: {MainCardComponent}
    })
    export default class DriveFiles extends Vue {

        files: Array<Matter> = []

        mounted() {
            for (let i = 0; i < 20; i++) {
                let file = new Matter()
                file.name = '文件名'
                file.dir = i < 6
                file.size = Math.random() * 10000000
                let min = Math.ceil(new Date(2019, 12, 31, 9).getTime())
                let max = Math.ceil(new Date().getTime())
                file.createTime = moment(Math.floor(Math.random() * (max - min + 1)) + min).format('YYYY-MM-DD HH:ss')
                this.files.push(file)
            }
        }

        mouseOver(file: Matter) {
            if (!file.active) {
                file.active = true
            }
        }

        mouseOut(file: Matter) {
            if (file.active) {
                file.active = false
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .files
        display flex

        .name
            flex 1
            display flex
            line-height 40px

            .text
                margin-left 5px

            .image-box
                width 30px
                height 30px

                .image
                    width 26px
                    height 26px

        .option
            margin-right 40px
            display flex

            div
                margin-left 5px

                .c-icon

                    color #888888

                .delete
                    color #FF5533

        .time
            margin-left 20px
            text-align justify

        .size
            width 90px


</style>