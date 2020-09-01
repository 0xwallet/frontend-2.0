<template>
    <div>
        <CModal
                :title="title"
                :show="show"
                size="sm"
        >
            <CAlert color="warning">
                {{ content }}
            </CAlert>
            <CForm>
                <CInput
                        label="Password"
                        :value.sync="password"
                />
            </CForm>
            <div slot="footer">
                <button type="button" class="btn btn-light" @click="commit()">
                    Commit
                </button>
            </div>
        </CModal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import {PasswordModule} from '@/store/PasswordModule'

    @Component
    export default class InputPasswordComponent extends Vue {

        password: string = ''

        get show(): boolean {
            return PasswordModule.show
        }

        get title(): string {
            return PasswordModule.title
        }

        get content(): string {
            return PasswordModule.content
        }

        commit() {
            if (this.password.length > 6) {
                PasswordModule.setHide()
                PasswordModule.callback(this.password)
            } else {
                CommonModule.toast({content: 'Please enter the correct password'})
            }
        }
    }
</script>

<style scoped>

</style>