<template>
    <div>
        <pdf
                style="height: 100%;width: 100%;overflow: hidden;"
                :src="src">
        </pdf>
    </div>
</template>

<script>
    import pdf from 'vue-pdf'

    export default {
        components: {
            pdf
        },
        data() {
            return {
                src: pdf.createLoadingTask('@/assets/test.pdf')
            }
        },
        // mounted() {
        //     this.getPdfCode()
        // },
        // methods: {
        //     getPdfCode() {
        //         let that = this
        //         this.axios({
        //             method: 'get',
        //             url:  'https://test-1252377390.cos.ap-shenzhen-fsi.myqcloud.com/test.pdf',
        //             headers: {
        //                 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //             },
        //             responseType: 'blob'  //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
        //         }).then(response => {
        //             that.src = that.getObjectURL(response.data)
        //         }).catch(function (error) {
        //             console.log(error)
        //         })
        //     },
        //     getObjectURL(file) {
        //         let url = null
        //         if (window.createObjectURL !== undefined) { // basic
        //             url = window.createObjectURL(file)
        //         } else if (window.webkitURL !== undefined) { // webkit or chrome
        //             try {
        //                 url = window.webkitURL.createObjectURL(file)
        //             } catch (error) {
        //                 console.error(error)
        //             }
        //         } else if (window.URL !== undefined) { // mozilla(firefox)
        //             try {
        //                 url = window.URL.createObjectURL(file)
        //             } catch (error) {
        //                 console.error(error)
        //             }
        //         }
        //         return url
        //     },
        // }
    }
</script>

<style lang="stylus" scoped>

</style>