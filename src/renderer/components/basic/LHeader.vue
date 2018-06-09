<template>
  <el-menu mode="horizontal" default-active="activeIndex" menu-trigger="click"
           @select="handleSelect" :router="ifRouter">
    <el-menu-item index="1" route="/workspace">Workspace</el-menu-item>
    <el-menu-item index="2" route="/tasks">Tasks</el-menu-item>
    <el-menu-item index="3" route="/script">Script</el-menu-item>
    <el-menu-item index="4" route="/about">About</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: 1,
        aboutLink: 'https://www.github.com/ZexuanTHU/llmt/',
        ifRouter: true,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>
