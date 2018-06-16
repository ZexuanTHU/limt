<template>
  <div>
    <el-row>
      <el-col :span="11">
        <el-tag type="info" size="medium">Contrast</el-tag>
        <el-input-number
          v-model="contrast" :min="1" :max="10" size="mini"
          @change="handleChangeContrast">
        </el-input-number>
        </el-col>
      <el-col :span="11" :offset="2">
        <el-tag type="info" size="medium">Brightness</el-tag>
        <el-input-number
          v-model="brightness" :min="0" :max="5" size="mini"
          :step="0.01"
          :precision="2"
          @change="handleChangeBright">
        </el-input-number>
      </el-col>
    </el-row>
    <br/>
    <el-row>
      <el-col :span="4">
      <el-tag type="info" size="medium">Kymograph</el-tag>
      </el-col>
      <el-col :span="18" offset="2">
      <el-slider
        v-model="kymographNum"
        :min="1"
        :max="10"
        show-stops
        @change="handleChangeKymographNum">
      </el-slider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contrast: 5,
      brightness: 1,
      kymographNum: 1,
    };
  },
  methods: {
    handleChangeContrast() {
      this.$store.commit('CHANGE_CONTRAST', this.contrast);
    },
    handleChangeBright() {
      this.$store.commit('CHANGE_BRIGHTNESS', this.brightness);
    },
    handleChangeKymographNum() {
      this.$store.commit('CHANGE_KYMOGRAPH_NUM', this.kymographNum);
    },
  },
};
</script>
