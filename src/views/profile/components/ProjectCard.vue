<template>
  <div class="">
    <PanThumb
      :image="$store.getters.userInfo.avatar"
      height="100px"
      width="100px"
    >
      <div>Hello</div>
      {{ $store.getters.userInfo.title }}
    </PanThumb>
  </div>
</template>
<script setup>
import PanThumb from '@/components/PanThumb'
</script>
<style lang="scss" scoped></style>
