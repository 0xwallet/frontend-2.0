<template>
    <div>
        <CModal
                title="Change Currency"
                :show.sync="show"
                size="sm"
        >
            <CForm>
                <CSelect
                        label="Currency"
                        :options="currency"
                        :value.sync="form.currency"
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
    import {UserModule} from '@/store/UserModule'
    import {Currency} from '@/store/model/User'

    @Component
    export default class EditCurrencyComponent extends Vue {
        form = {
            currency: this.userInfo.setting?.currency || Currency.USD
        }
        show = false
        currency = [
            Currency.CNY,
            Currency.USD,
        ]


        loading = false

        showModal() {
            this.show = true
        }
        commit() {
            this.show = false
            UserModule.editCurrentUserSetting({
                currency: this.form.currency!
            })
        }

        get userInfo() {
            return UserModule.userInfo
        }

    }
</script>

<style scoped>

</style>