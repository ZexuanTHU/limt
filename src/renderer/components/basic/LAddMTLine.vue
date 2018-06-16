<template>
  <el-button-group>
    <nobr>
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-edit"
      @click="toggleIfDrawingLine">
      Draw
     </el-button>
     <el-button
      type="primary"
      size="mini"
      icon="el-icon-delete"
      @click="resetLine">
      Reset
     </el-button>
    <el-button
      type="success"
      size="mini"
      icon="el-icon-plus"
      @click="addLine">
      Submit
     </el-button>
    </nobr>
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
    },
    addLine() {
      this.$message({
        showClose: true,
        message: 'Drawed line already submitted!',
        type: 'success',
      });
    },
  },
};
</script>

