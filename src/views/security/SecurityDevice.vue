<template>
    <div>
        <main-card-component class="device" :title="$t('security.device.device')">
            <CButton slot="right-action" class="btn-right btn-pill btn-ghost-info"
                     @click="$refs.bindNknAddress.showModal()">
                {{ $t('security.device.add_new_device') }}
            </CButton>
            <main-card-item-component @onClick="onItemClick" :items="devices"></main-card-item-component>
        </main-card-component>
        <security-bind-nkn-address ref="bindNknAddress"></security-bind-nkn-address>
        <security-device-detail ref="deviceDetail"></security-device-detail>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import MainCardComponent from '@/components/MainCardComponent.vue'
    import {UserModule} from '@/store/UserModule'
    import SecurityBindNknAddress from '@/views/security/SecurityBindNknAddress.vue'
    import MainCardItemComponent from '@/components/MainCardItemComponent.vue'
    import {WalletTag, WalletType} from '@/store/model/Wallet'
    import SecurityDeviceDetail from '@/views/security/SecurityDeviceDetail.vue'

    @Component({
        components: {SecurityDeviceDetail, MainCardItemComponent, SecurityBindNknAddress, MainCardComponent}
    })
    export default class SecurityDevice extends Vue {

        $refs !: {
            bindNknAddress: SecurityBindNknAddress,
            deviceDetail: SecurityDeviceDetail
        }

        get wallets() {
            return UserModule.userInfo.wallets
        }

        get devices() {
            let devices: any[] = []
            this.wallets?.map(item => {
                if (item.type === WalletType.NKN && item.tags![0] != WalletTag.MESSAGE) {
                    if (item.tags && item.tags.length > 0) {
                        item.name = '<i>' + item.tags[0] + '</i>'
                    } else {
                        item.name += item.info.publicKey!!
                    }
                    devices.push(item)
                }
            })
            return devices
        }

        onItemClick(item: any) {
            this.$refs.deviceDetail.showModal(item)
        }
    }
</script>

<style lang="stylus" scoped>
    .device
        .btn-right
            float right
</style>