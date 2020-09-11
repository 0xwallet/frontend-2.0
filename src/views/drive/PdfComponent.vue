<template>
    <div class="back">
        <div class="close" @click="close">
            <CIcon name="cil-x"></CIcon>
        </div>
        <div class="pdf-box">
            <pdf
                    v-for="i in numPages"
                    :key="i"
                    :src="src"
                    :page="i"
            ></pdf>
        </div>
    </div>
</template>

<script>
    import pdf from 'vue-pdf'


    export default {
        components: {
            pdf
        },
        props: {
            url: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                src: undefined,
                numPages: undefined,
            }
        },
        mounted() {
            this.src = pdf.createLoadingTask(this.url)

            this.src.promise.then(pdf => {
                this.numPages = pdf.numPages
            })
        },
        methods: {
            close() {
                this.$emit('onClose')
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .back
        position fixed
        z-index 1000000
        top 0
        left 0
        height 100%
        width 100%
        background rgba(0, 0, 0, 0.3)
        overflow auto

        .pdf-box
            width 50%
            margin-left auto
            margin-right auto

        .close
            position fixed
            top 0
            right 0
            height 40px
            width 60px
            font-size 30px
            padding-left 18px
            border-bottom-left-radius 30px
            color white
            background black
            cursor pointer

            &:hover
                background rgba(40, 40, 40, 1)
</style>