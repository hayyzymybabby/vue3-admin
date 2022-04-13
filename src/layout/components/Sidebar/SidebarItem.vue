<template>
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染 -->
    <SidebarItem v-for="item in route.children" :key="item.path" :route="item">
    </SidebarItem>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style></style>
