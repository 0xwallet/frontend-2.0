<template>
    <div>
        <CRow v-if="!pageLoading">
            <CCol xl="12">
                <drive-files></drive-files>
            </CCol>
        </CRow>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import DriveFiles from '@/views/drive/DriveFiles.vue'

    @Component({
        components: {DriveFiles}
    })
    export default class Drive extends Vue {

        mounted() {
            // DriveModule.getEyeblueUserInfo().then(() => {
            CommonModule.hidePageLoading()
            // })
            // CommonModule.hidePageLoading()
        }

        get pageLoading() {
            return CommonModule.pageLoading
        }
    }
</script>

<style lang="stylus" scoped>

</style>