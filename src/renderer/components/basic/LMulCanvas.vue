<template>
<div>
    <canvas v-for="i in layersNum" :key="i"></canvas>
</div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
