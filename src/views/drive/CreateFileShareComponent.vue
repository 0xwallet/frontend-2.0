<template>
    <div>
        <CModal
                title="Share File"
                :show.sync="show"
        >
            <div class="fileName" v-if="uri === ''">{{ fileName }}</div>
            <CInput v-if="uri===''" label="input password" :value.sync="$v.form.password.$model"
                    :isValid="checkIfValid('password')"
                    invalidFeedback="This is a required field and length 4"
            ></CInput>
            <div class="share-res" v-if="uri !== ''">
                <div class="title">
                    <div>
                        <CImg class="icon"
                              :src="require('@/assets/images/icon/icon-ok.png')"></CImg>
                    </div>
                    <div>分享成功</div>
                </div>
                <div>链接：{{ shareUri }}</div>
                <div>提取码：{{ form.password }}</div>
                <div class="time">
                    <div>7天内有效</div>
                    <div class="copy" :data-clipboard-text="shareString" @click="copy">
                        复制链接及提取码
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button v-if="uri === ''" type="button" class="btn btn-light" @click="share">
                    Share
                </button>
            </div>
        </CModal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {File} from '@/store/model/File'
    import {randomString} from '@/common/StringUtil'
    import {validationMixin} from 'vuelidate'
    import {maxLength, minLength, required} from 'vuelidate/lib/validators'
    import {DriveModule} from '@/store/DriveModule'
    import {CommonModule} from '@/store/CommonModule'
    import {UserModule} from '@/store/UserModule'
    import Clipboard from 'clipboard'
    import {ToastColor} from '@/store/model/Toast'

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
        uri = ''

        showModal(file: File) {
            this.show = true
            this.file = file
            this.fileName = file.name
            // 生成一个密码
            this.form.password = randomString(4)
        }

        valid() {
            return !this.$v.form.$invalid
        }

        copy() {
            let clipboard = new Clipboard('.copy')
            clipboard.on('success', () => {
                CommonModule.toast({content: 'Copy Successfully', color: ToastColor.SUCCESS})
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                CommonModule.toast({content: 'The browser does not support automatic copying'})
                clipboard.destroy()
            })

        }

        get shareUri() {
            let host = window.location.host
            return document.location.protocol + '//' + host + '/' + this.$router.resolve({path: '/s/' + this.uri}).href
        }

        get shareString() {
            return '链接：' + this.shareUri + ' 提取码：' + this.form.password + ' --来自0xDrive网盘' + UserModule.userInfo.username + '的分享'
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
                DriveModule.createShare({
                    code      : this.form.password,
                    userFileId: this.file!.id
                }).then(res => {
                    this.uri = res.data.driveCreateShare.uri
                }).catch(() => {
                    this.show = false
                    CommonModule.toast({content: '分享错误'})
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .fileName
        font-size 26px

    .share-res
        .title
            font-weight bold
            font-size 18px
            display flex
            justify-content center
            margin-bottom 20px

            .icon
                height 18px
                margin-right 5px
                margin-left -10px

        .time
            font-size 12px
            color #999999
            margin-top 20px
            display flex
            justify-content space-evenly

            .copy
                color #321FDB
                cursor pointer
</style>