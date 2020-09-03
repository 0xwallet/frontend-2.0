<template>
    <div>
        <CModal v-if="device"
                :title="$t('security.device.Device Detail')"
                :show.sync="show"
        >
            <div class="device">
                <h5>{{ $t('security.device.detail.ID') }}</h5>
                <div class="value">
                    {{ device.id }}
                </div>
                <h5>{{ $t('security.device.detail.Public Key') }}</h5>
                <div class="value public-key">
                    {{ device.info.publicKey }}
                    <div @click="copy"
                         class="copy"
                         :data-clipboard-text="device.info.publicKey">
                        <CIcon
                                name="cil-copy"
                                v-c-tooltip.hover.click="'Copy Public Key'"/>
                    </div>
                </div>
                <h5>{{ $t('security.device.detail.Type') }}</h5>
                <div class="value">
                    {{ device.type }}
                </div>
                <h5>{{ $t('security.device.detail.Tags') }}</h5>
                <div class="value">
                    <span v-for="(tag,index) in device.tags" :key="index">{{ tag }}</span>
                </div>
            </div>
            <div slot="footer">
                <button type="button" class="btn btn-light btn-primary" :disabled="isLoginCode"
                        @click="$refs.bindLoginCode.showModal(device.id)">
                    {{ $t('security.device.detail.Bind Login Code') }}
                </button>
            </div>
        </CModal>
        <security-bind-login-code ref="bindLoginCode"></security-bind-login-code>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Clipboard from 'clipboard'
    import {CommonModule} from '@/store/CommonModule'
    import {ToastColor} from '@/store/model/Toast'
    import SecurityBindLoginCode from '@/views/security/SecurityBindLoginCode.vue'
    // eslint-disable-next-line no-unused-vars
    import {Wallet} from '@/store/model/Wallet'


    @Component({
        components: {SecurityBindLoginCode}
    })
    export default class SecurityDeviceDetail extends Vue {

        $refs !: {
            bindLoginCode: SecurityBindLoginCode
        }

        show = false
        device : Wallet | null = null

        showModal(device: Wallet) {
            this.device = device
            this.show = true
        }

        get isLoginCode() {
            if (!this.device) {
                return false
            }
            return this.device.tags?.some(item => {
                return item == 'LOGIN_CODE'
            })
        }

        copy() {
            let clipboard = new Clipboard('.copy')
            clipboard.on('success', () => {
                CommonModule.toast({content: this.$t('common.Copy Successfully').toString(), color: ToastColor.SUCCESS})
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                CommonModule.toast({content: this.$t('common.The browser does not support automatic copying').toString()})
                clipboard.destroy()
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .device
        padding-left 15px
        padding-right 15px

        h5
            margin-top 22px

        .value
            margin-top 10px

        .public-key
            word-break break-all

            .copy
                float right
</style>