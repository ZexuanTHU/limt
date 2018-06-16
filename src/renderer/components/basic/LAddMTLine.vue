<template>
  <el-button-group>
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus">
      Add Line
     </el-button>
     <el-button
      type="primary"
      size="mini"
      icon="el-icon-edit"
      @click="toggleIfDrawingLine">
      Draw Line
     </el-button>
  </el-button-group>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    toggleIfDrawingLine() {
      this.$store.commit('TOGGLE_MUL_CANVAS_STATE', true);
      console.log(this.$store.getters.getMulCanvasState('if_drawing_line'));
    },
  },
};
</script>

