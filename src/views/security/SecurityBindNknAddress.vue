<template>
    <div>
        <CModal
                :title="$t('security.device.device')"
                :show.sync="show"
        >
            <CForm>
                <CInput
                        :label="$t('security.device.Input Your Email Code')"
                        :valid-feedback="$t('validate.Input is valid.')"
                        :invalid-feedback="$t('validate.MinLength')+': 6'"
                        :value.sync="$v.form.code.$model"
                        :isValid="checkIfValid('code')"
                >
                    <template #append>
                        <CButton block pressed variant="ghost" color="light" @click="sendCode">
                            {{ time !== 0 ? time + 's' : $t('security.device.Send')}}
                        </CButton>
                    </template>
                </CInput>
                <CInput
                        :label="$t('security.device.Input Your PublicKey')"
                        :valid-feedback="$t('validate.Input is valid.')"
                        :invalid-feedback="$t('validate.MinLength')+': 64'"
                        :value.sync="$v.form.publicKey.$model"
                        :isValid="checkIfValid('publicKey')"
                />
            </CForm>
            <div slot="footer">
                <button type="button" class="btn btn-light" @click="commit()">
                    Commit
                </button>
            </div>
            <CElementCover v-if="loading"/>
        </CModal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {minLength, required} from 'vuelidate/lib/validators'
    import {validationMixin} from 'vuelidate'
    import {NknModule} from '@/store/NknModule'
    import {CommonModule} from '@/store/CommonModule'
    import {ToastColor} from '@/store/model/Toast'
    import {UserModule} from '@/store/UserModule'
    import {WalletTag} from '@/store/model/Wallet'

    @Component({
        mixins     : [validationMixin],
        validations: {
            form: {
                publicKey: {
                    required,
                    minLength: minLength(64)
                },
                code     : {
                    required,
                    minLength: minLength(6)
                }
            }
        }
    })
    export default class SecurityBindNknAddress extends Vue {

        show = false
        form = this.getEmptyForm()
        time = 0
        loading = false

        showModal() {
            this.show = true
        }

        sendCode() {
            if (this.time == 0) {
                this.time = 60
                UserModule.sendVerifyCode({email: this.userInfo.email, type: 'CHANGE_INFO'})
            }
        }

        get userInfo() {
            return UserModule.userInfo
        }

        mounted() {
            this.timeReduction()
        }

        timeReduction() {
            setInterval(() => {
                if (this.time > 0) {
                    this.time--
                }
            }, 1000)
        }

        checkIfValid(fieldName: string) {
            const field = this.$v.form[fieldName]
            if (field == undefined) {
                return null
            }
            if (!field.$dirty) {
                return null
            }
            return !(field.$invalid || field.$model === '')
        }

        getEmptyForm() {
            return {
                publicKey: '',
                code     : ''
            }
        }

        valid() {
            return !this.$v.form.$invalid
        }

        commit() {
            if (this.valid()) {
                this.loading = true
                NknModule.bindNknAddress({
                    nknAddress: this.form.publicKey,
                    code      : this.form.code,
                    tag       : WalletTag.LOGIN_CODE
                }).then(() => {
                    CommonModule.toast({content: 'Create Wallet Successfully', color: ToastColor.SUCCESS})
                    this.form.publicKey = ''
                    this.loading = false
                    this.show = false
                }).catch(() => {
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>