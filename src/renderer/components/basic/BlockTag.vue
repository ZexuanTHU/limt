<template>
  <div>
    <el-tag>
      {{tagName}}
    </el-tag>
    <br/>
    <br/>
  </div>
</template>

<script>
  export default {
    props: ['tagName'],
  };
</script>
