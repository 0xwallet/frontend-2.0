<template>
    <div>
        <CModal
                title="Email Verify"
                :show.sync="show"
                size="sm"
        >
            <CForm>
                <CInput
                        label="Input Your Email Verify Code"
                        :value.sync="form.code"
                >
                    <template #append>
                        <CButton block pressed variant="ghost" color="light" @click="sendCode">
                            {{ time !== 0 ? time + 's' : 'Send'}}
                        </CButton>
                    </template>
                </CInput>
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
    import {UserModule} from '@/store/UserModule'
    import {Watch} from 'vue-property-decorator'

    @Component
    export default class CheckEmailComponent extends Vue {
        form = {
            code: ''
        }
        show = false

        time = 0

        loading = false

        mounted() {
            this.timeReduction()
        }

        @Watch('show')
        watchShow(value: boolean) {
            if (!value) {
                this.$emit('onHide')
            }
        }

        timeReduction() {
            setInterval(() => {
                if (this.time > 0) {
                    this.time--
                }
            }, 1000)
        }

        showModal() {
            this.show = true
        }

        commit() {
            this.show = false
            this.$emit('commit', this.form.code)
            this.form.code = ''
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

    }
</script>

<style scoped>

</style>