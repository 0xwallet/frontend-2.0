<template>
    <div>
        <CModal
                :title="$t('drive.files.uploadFile.title')"
                :show.sync="show"
        >
            <div>
                <uploader :options="options">
                    <uploader-unsupport></uploader-unsupport>
                    <uploader-drop>
                        <p>拖动文件上传</p>
                        <uploader-btn>选择文件</uploader-btn>
                    </uploader-drop>
                    <uploader-list></uploader-list>
                </uploader>
            </div>
            <div slot="footer">
                <!--                <button type="button" class="btn btn-light">-->
                <!--                    {{ $t('drive.files.uploadFile.upload') }}-->
                <!--                </button>-->
            </div>
        </CModal>
    </div>
</template>

<script>
    import uploader from 'vue-simple-uploader'
    import Vue from 'vue'
    import {mapState} from "vuex"

    Vue.use(uploader)

    export default {
        data() {
            return {
                show: false,
                options: {
                    target: "https://drive-s.owaf.io/api/matter/upload",
                    testChunks: false,
                    query: {
                        puuid: 'root',
                        userUuid: ''
                    },
                    headers: {
                        test: '2323',
                        cookie: '2323'
                    },
                    cookie: true,
                    withCredentials: true
                }
            }
        },
        components: {},
        computed: {
            ...mapState({
                eyeblueUserInfo: state => state.DriveModule.eyeblueUserInfo
            })
        },
        mounted() {
            this.options.query.userUuid = this.eyeblueUserInfo.uuid
            this.options.headers.cookie = this.eyeblueUserInfo.cookie
            // this.options.cookie = this.eyeblueUserInfo.cookie
            document.cookie = this.eyeblueUserInfo.cookie
        },
        methods: {
            showModal() {
                this.show = true
            },
        },
    }
</script>

<style lang="stylus" scoped>

</style>