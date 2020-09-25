<template>
    <div>
        <div class="text-uppercase mb-1 mt-4">
            <small><b>Drive Space Usage</b></small>
        </div>
        <CProgress class="progress-xs" color="info" :value="usedRate"/>
        <small class="text-muted">{{ usedSpace }}/{{ totalSpace }}</small>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {UserModule} from '@/store/UserModule'
    import {formatBytes} from '@/store/model/File'

    @Component
    export default class SystemUtilizationComponent extends Vue {

        mounted(){
            console.log(this.usedRate)
        }


        get userInfo() {
            return UserModule.userInfo
        }

        get totalSpace() {
            return formatBytes(Number(this.userInfo.driveSetting?.totalSpace ?? 0))
        }

        get usedSpace() {
            return formatBytes(Number(this.userInfo.driveSetting?.usedSpace ?? 0))
        }

        get usedRate() {
            return Number(this.userInfo.driveSetting?.usedSpace) / Number(this.userInfo.driveSetting?.totalSpace) * 100
        }
    }
</script>

<style scoped>

</style>