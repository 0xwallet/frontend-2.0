<template>
    <div>
        <CModal
                title="Create Folder"
                :show.sync="show"
                size="sm"
        >
            <CInput label="Folder Name" :value.sync="dirName"
            ></CInput>
            <div slot="footer">
                <button type="button" class="btn btn-light" @click="makeDir">
                    Create
                </button>
            </div>
        </CModal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {DriveModule} from '@/store/DriveModule'
    import {Prop} from 'vue-property-decorator'
    import {DriveSpace} from '@/store/model/File'

    @Component
    export default class MakeDirComponent extends Vue {

        show = false
        dirName = ''
        fullName: string[] = []

        @Prop({
            type   : Boolean,
            default: false
        })
        public !: boolean

        showModal(fullName: string[]) {
            this.show = true
            this.fullName = fullName
        }

        makeDir() {
            this.fullName.push(this.dirName)
            DriveModule.driveMakeDir({
                fullName : this.fullName,
                space: this.public ? DriveSpace.PUBLIC : DriveSpace.PRIVATE
            }).then(() => {
                this.show = false
                this.$emit('onCreated')
            })
        }
    }
</script>

<style scoped>

</style>