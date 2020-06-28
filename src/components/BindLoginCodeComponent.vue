<template>
    <div>
        <CModal
                title="Bind Login Code"
                :show.sync="show"
                size="sm"
        >
            <CForm>
                <CInput
                        label="Input Your Nkn Message Code"
                        valid-feedback="Input is valid."
                        invalid-feedback="MinLength: 6"
                        :value.sync="$v.form.code.$model"
                        :isValid="checkIfValid('code')"
                >
                    <template #append>
                        <CButton block pressed variant="ghost" color="light" @click="sendCode">
                            {{ time !== 0 ? time + 's' : 'Send'}}
                        </CButton>
                    </template>
                </CInput>
                <CInput
                        label="Input Your Password"
                        valid-feedback="Input is valid."
                        invalid-feedback="MinLength: 8"
                        :value.sync="$v.form.password.$model"
                        :isValid="checkIfValid('password')"
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
    import {validationMixin} from 'vuelidate'
    import {minLength, required} from 'vuelidate/lib/validators'
    import {NknModule} from '@/store/NknModule'
    import {CommonModule} from '@/store/CommonModule'
    import {ToastColor} from '@/store/model/Toast'
    import {WalletTag} from '@/store/model/Wallet'
    import {UserModule} from '@/store/UserModule'

    @Component({
        mixins     : [validationMixin],
        validations: {
            form: {
                code    : {
                    required,
                    minLength: minLength(6)
                },
                password: {
                    required,
                    minLength: minLength(8)
                },
            }
        }
    })
    export default class BindLoginCodeComponent extends Vue {
        show = false
        form = this.getEmptyForm()
        loading = false
        time = 0

        walletId: string = ''

        mounted() {
            this.timeReduction()
        }

        showModal(walletId: string) {
            this.walletId = walletId
            this.show = true
        }

        timeReduction() {
            setInterval(() => {
                if (this.time > 0) {
                    this.time--
                }
            }, 1000)
        }

        sendCode() {
            if (this.time == 0) {
                this.time = 60
                NknModule.sendLoginCode({
                    email   : UserModule.userInfo.email,
                    walletId: this.walletId
                }).then(() => {
                    CommonModule.toast({content: 'Login Code Send Successfully'})
                })
            }
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
                code    : '',
                password: '',
            }
        }

        valid() {
            return !this.$v.form.$invalid
        }

        commit() {
            if (this.walletId == '') {
                CommonModule.toast({content: 'An error occurred during the binding process'})
                this.show = false
                return
            }
            if (this.valid()) {
                this.loading = true
                NknModule.setDefaultNknAddress({
                    loginCode: this.form.code,
                    password : this.form.password,
                    tag      : WalletTag.LOGIN_CODE,
                    walletId : this.walletId,
                }).then(() => {
                    CommonModule.toast({content: 'Bind Login Wallet Successfully', color: ToastColor.SUCCESS})
                    this.loading = false
                    this.show = false
                })
            }
        }
    }
</script>

<style scoped>

</style>