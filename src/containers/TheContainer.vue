<template>
    <div class="c-app" :class="{ 'c-dark-theme': $store.state.darkMode }">
        <TheSidebar/>
        <TheAside></TheAside>
        <MessageComponent></MessageComponent>
        <SearchComponent></SearchComponent>
        <CWrapper>
            <TheHeader/>
            <div class="c-body">
                <main class="c-main">
                    <CContainer fluid>
                        <!--                        <transition name="fade">-->
                        <router-view :key="$route.fullPath"></router-view>
                        <!--                        </transition>-->
                    </CContainer>
                </main>
                <CElementCover v-if="pageLoading"/>
                <TheFooter/>
                <input-password-component></input-password-component>
            </div>
        </CWrapper>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import TheSidebar from './TheSidebar.vue'
    import TheHeader from './TheHeader.vue'
    import TheFooter from './TheFooter.vue'
    import Component from 'vue-class-component'
    import {CommonModule} from '@/store/CommonModule'
    import TheAside from '@/containers/TheAside.vue'
    import MessageComponent from '@/components/MessageComponent.vue'
    import InputPasswordComponent from '@/components/InputPasswordComponent.vue'
    import SearchComponent from '@/components/SearchComponent.vue'

    @Component({
        components: {
            SearchComponent,
            InputPasswordComponent,
            MessageComponent,
            TheAside,
            TheSidebar,
            TheHeader,
            TheFooter,
        }
    })
    export default class TheContainer extends Vue {

        get pageLoading() {
            return CommonModule.pageLoading
        }

    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
