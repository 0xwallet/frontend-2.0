<template>
  <CSidebar 
    aside 
    :show.sync="show" 
    colorScheme="light"
    overlaid
    size="lg"
  >
    <CSidebarClose @click.native="show= !show"/>
  </CSidebar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TheAside',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.$root.$on('toggle-aside', () => this.show = !this.show)
  }
})
</script>
