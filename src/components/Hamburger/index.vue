<template>
  <div class="hamburger-container" @click="toggleClick">
    <SvgIcon class="hamburger" :icon="icon"></SvgIcon>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}

const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
