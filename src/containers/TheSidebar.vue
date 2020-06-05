<template>
  <CSidebar 
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand to="/">
      <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size"
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>
    <CRenderFunction flat :contentToRender="nav"/>
    <CSidebarMinimizer 
      class="c-d-md-down-none" 
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script lang="ts">
import Vue from 'vue'
import { nav } from './_nav'

declare interface dataInterface {
  nav: typeof nav
}

export default Vue.extend({
  name: 'TheSidebar',
  data (): dataInterface {
    return {
      nav
    }
  },
  computed: {
    show (): string | boolean {
      return this.$store.state.sidebarShow
    },
    minimize (): boolean {
      return this.$store.state.sidebarMinimize 
    }
  }
})
</script>
