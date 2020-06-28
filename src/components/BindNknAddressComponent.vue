<template>
    <div>
        <CModal
                title="Create Wallet"
                :show.sync="show"
        >
            <CForm>
                <CInput
                        label="Input Your PublicKey"
                        valid-feedback="Input is valid."
                        invalid-feedback="MinLength: 64"
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

    @Component({
        mixins     : [validationMixin],
        validations: {
            form: {
                publicKey: {
                    required,
                    minLength: minLength(64)
                },
            }
        }
    })
    export default class BindNknAddressComponent extends Vue {

        show = false
        form = this.getEmptyForm()
        loading = false

        showModal() {
            this.show = true
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
            }
        }

        valid() {
            return !this.$v.form.$invalid
        }

        commit() {
            if (this.valid()) {
                this.loading = true
                NknModule.bindNknAddress({
                    nknAddress: this.form.publicKey
                }).then(() => {
                    CommonModule.toast({content: 'Create Wallet Successfully', color: ToastColor.SUCCESS})
                    this.form.publicKey = ''
                    this.loading = false
                    this.show = false
                })
            }
        }
    }
</script>

<style scoped>

</style>