<template>
    <div>
        <CModal
                :title="$t('drive.files.uploadFile.title')"
                :show.sync="show"
        >

            <div slot="footer">
                <button type="button" class="btn btn-light">
                    {{ $t('drive.files.uploadFile.upload') }}
                </button>
            </div>
        </CModal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class DriveUploadFile extends Vue {
        show = false

        showModal() {
            this.show = true
        }
    }
</script>

<style lang="stylus" scoped>

</style>