import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

declare interface state {
    sidebarShow: string | boolean,
    sidebarMinimize: boolean,
    asideShow: boolean,
    darkMode: boolean
}

const state: state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    asideShow: false,
    darkMode: false
}

const mutations = {
    toggleSidebarDesktop(state: any) {
        const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state: any) {
        const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state: any, [variable, value]: [string, any]) {
        state[variable] = value
    },
    toggle(state: any, variable: string) {
        state[variable] = !state[variable]
    }
}

const store: any = new Vuex.Store({
    state,
    mutations
})

export {store}