<template>
    <div>
        <CModal
                title="Share File"
                :show.sync="show"
                size="sm"
        >
            <div class="fileName">{{ fileName }}</div>
            <CInput label="input password" :value.sync="$v.form.password.$model"
                    :isValid="checkIfValid('password')"
                    invalidFeedback="This is a required field and length 4"
            ></CInput>
            <div slot="footer">
                <button type="button" class="btn btn-light">
                    Share
                </button>
            </div>
        </CModal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    // eslint-disable-next-line no-unused-vars
    import {File} from '@/store/model/file'
    import {randomString} from '@/common/StringUtil'
    import {validationMixin} from 'vuelidate'
    import {maxLength, minLength, required} from 'vuelidate/lib/validators'

    @Component({
        mixins     : [validationMixin],
        validations: {
            form: {
                password: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(4)
                }
            }
        }
    })
    export default class CreateFileShareComponent extends Vue {
        show = false
        fileName = 'no name'
        file ?: File
        form = this.getEmptyForm()

        showModal(file: File) {
            this.show = true
            this.file = file
            // 生成一个密码
            this.form.password = randomString(4)
        }

        valid() {
            return !this.$v.form.$invalid
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
                password: '',
            }
        }

        share() {
            if (this.valid()) {
                //TODO: 调用createShare
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .fileName
        font-size 26px
</style>