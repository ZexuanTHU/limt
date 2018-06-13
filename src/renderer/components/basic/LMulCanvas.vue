<template>
  <div>
    <canvas :id="'layer' + currentLayer" height="512" width="170"></canvas>
    <button @click="last">-</button>
    <button @click="next">+</button>
    <p>current Layer: {{currentLayer}}</p>
    <el-slider
      v-model="currentLayer"
      show-input>
    </el-slider>
  </div>
</template>

<script>
export default {
  props: [
    'buffer',
  ],
  data() {
    return {
      currentLayer: 0,
    };
  },
  computed: {
    imgBuffer() {
      return this.$store.getters.getBufferByLabel(this.buffer);
    },
    imgLayersNum() {
      return this.imgBuffer.value.length;
    },
  },
  created() {
    this.putMTImg();
  },
  watch: {
    currentLayer() {
      let cID = String('layer' + (this.currentLayer));
      this.putMTImg(cID);
    },
  },
  methods: {
    next() {
      this.currentLayer < this.imgLayersNum ?
        this.currentLayer++ : this.currentLayer = this.imgLayersNum;
    },
    last() {
      this.currentLayer > 1 ?
        this.currentLayer-- : this.currentLayer = 1;
    },
    putMTImg(cID) {
      let img = this.imgBuffer.value[this.currentLayer - 1];
      this.$nextTick(function() {
        console.log(cID);
        let c = document.getElementById(cID);
        let ctx = c.getContext('2d');
        let imgClamp = new Uint8ClampedArray(img);
        let imgData = new ImageData(imgClamp, 2 * 85, 2 * 256);
        ctx.putImageData(imgData, 0, 0);
      });
    },
  },
};
</script>
