<template>
    <div>
        <CRow v-if="!pageLoading">
            <CCol xl="6" class="left">
                <drive-files></drive-files>
            </CCol>
            <CCol xl="6">
            </CCol>
        </CRow>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import DriveFiles from '@/views/drive/DriveFiles.vue'
    import {DriveModule} from '@/store/DriveModule'

    @Component({
        components: {DriveFiles}
    })
    export default class Drive extends Vue {

        mounted() {
            DriveModule.getEyeblueUserInfo().then(() => {
                CommonModule.hidePageLoading()
            })
            // CommonModule.hidePageLoading()
        }

        get pageLoading() {
            return CommonModule.pageLoading
        }
    }
</script>

<style lang="stylus" scoped>

</style>