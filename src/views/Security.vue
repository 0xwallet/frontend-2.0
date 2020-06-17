<template>
    <div>
        <CRow v-if="!pageLoading">
            <CCol sm="4">
                <CCard>
                    <CCardHeader>
                        Wallets
                        <CButton class="btn-create" size="sm" variant="ghost" color="success"
                                 @click="() => this.$refs.bindNknAddress.showModal()">Create Wallet
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CCard accent-color="info" v-for="wallet in wallets" :key="wallet.id">
                            <CCardHeader>
                                <div class="title">{{ wallet.info.publicKey || wallet.info.address }}</div>
                                <CBadge class="wallet-type" color="warning">{{ wallet.type }}</CBadge>
                                <CBadge class="wallet-tag" v-for="(tag,index) in wallet.tags" :key="'tag' + index"
                                        color="info" shape="pill">{{ tag }}
                                </CBadge>
                                <div class="card-header-actions" style="width: 74px">
                                    <CDropdown
                                            add-toggler-classes="card-header-action wallet-action"
                                            size="sm"
                                            :caret="false"
                                    >
                                        <template #toggler-content>
                                            <CIcon name="cil-settings"/>
                                        </template>
                                        <CDropdownItem @click="bindLoginCode(wallet.id)">Bind
                                            Login Code
                                        </CDropdownItem>
                                    </CDropdown>
                                    <CLink style="color: #8a93a2" class="card-header-action btn-minimize"
                                           @click="wallet.show = !wallet.show">
                                        <CIcon :name="`cil-chevron-${!wallet.show ? 'bottom' : 'top'}`"/>
                                    </CLink>
                                    <CLink style="color: #8a93a2" href="#" class="card-header-action btn-close"
                                           @click="deleteWallet(wallet.id)">
                                        <CIcon name="cil-x-circle"/>
                                    </CLink>
                                </div>
                            </CCardHeader>
                            <CCollapse :show="wallet.show" :duration="400">
                                <CCardBody>
                                    <!--                                    <div><strong>address:</strong> {{ wallet.info.address }}</div>-->
                                    <!--                                    <div><strong>identifier:</strong> {{ wallet.info.identifier }}</div>-->
                                    <div>
                                        <!--                                        <strong>publicKey:</strong>-->
                                        <CCard body-wrapper>
                                            <div>
                                                <div>{{ wallet.info.publicKey || wallet.info.address}}</div>
                                                <div class="public-key-action card-header-action copy" @click="copy"
                                                     :data-clipboard-text="wallet.info.publicKey || wallet.info.address"
                                                >
                                                    <CIcon
                                                            name="cil-copy"
                                                            v-c-tooltip.hover.click="'Copy Public Key'"/>
                                                </div>
                                            </div>
                                        </CCard>
                                    </div>

                                </CCardBody>
                            </CCollapse>
                        </CCard>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CElementCover v-if="pageLoading"/>
        <BindNknAddressComponent ref="bindNknAddress"></BindNknAddressComponent>
        <BindLoginCodeComponent ref="bindLoginCode"></BindLoginCodeComponent>
    </div>

</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import {UserModule} from '@/store/UserModule'
    import {NknModule} from '@/store/NknModule'
    import BindNknAddressComponent from '@/components/BindNknAddressComponent.vue'
    import Clipboard from 'clipboard'
    import BindLoginCodeComponent from '@/components/BindLoginCodeComponent.vue'

    @Component({
        components: {BindLoginCodeComponent, BindNknAddressComponent}
    })
    export default class Security extends Vue {

        $refs !: {
            bindLoginCode: BindLoginCodeComponent
            bindNknAddress: BindNknAddressComponent
        }

        copy() {
            console.log('test')
            let clipboard = new Clipboard('.copy')
            clipboard.on('success', () => {
                CommonModule.toast('Copy Successfully')
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                CommonModule.toast('The browser does not support automatic copying')
                clipboard.destroy()
            })
        }

        mounted() {
            setTimeout(() => {
                CommonModule.hidePageLoading()
            }, 1000)
        }

        bindLoginCode(walletId: string) {
            this.$refs.bindLoginCode.showModal(walletId)
        }

        get pageLoading() {
            return CommonModule.pageLoading
        }

        get wallets() {
            console.log(UserModule.userInfo.wallets)
            return UserModule.userInfo.wallets
        }

        deleteWallet(id: string) {
            NknModule.deleteWallet({
                id: id
            }).then(() => {
                CommonModule.toast('Delete Successfully')
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .title
        width auto
        word-break keep-all
        white-space nowrap
        overflow hidden
        text-overflow ellipsis

    .public-key-action
        float right

    .btn-create
        float right

    .wallet-type
        margin-right 10px

    .wallet-tag
        font-size 10px
</style>