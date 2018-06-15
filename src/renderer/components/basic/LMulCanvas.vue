<template>
  <el-card :body-style="{ padding: '0px' }" shadow="never">
    <div slot="header" class="clearfix">
      <span>{{headerName}}</span>
      <el-tooltip content="Done">
        <el-button style="float: right; padding: 5px;" circle
                    icon="el-icon-check" type="success">
        </el-button>
      </el-tooltip>
    </div>
    <br/>
    <el-row>
      <el-col span="12" offset="1">
        <block-tag tag-name="Image"></block-tag>
        <el-card :body-style="elcardStyle" shadow="hover">
          <el-row>
            <el-col span="12">
              <canvas
                :id="'layer' + currentLayer"
                :width="imgWidth[currentLayer - 1]"
                :height="imgHeight[currentLayer - 1]"
                @mousemove="zoom">
              </canvas>
            </el-col>
            <el-col span="12">
              <canvas
                :id="'layerzoom' + currentLayer"
                width="120px"
                height="120px"
                style="border: 1px solid white">
              </canvas>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col span="8" offset="2">
        <block-tag tag-name="Actions"></block-tag>
        <el-card shadow="hover">
          <el-checkbox-group v-model="rgbOption" size="mini">
            <el-checkbox-button
             v-for="c in rgb"
             :label="c"
             :key="c">{{c}}
            </el-checkbox-button>
          </el-checkbox-group>
          <br/>
          <el-switch
            v-model="ifZoomSmoothing"
            active-text="Zoom Smoothing"
          >
          </el-switch>
          <el-slider
            v-model="currentLayer"
            max="900"
            show-tooltip="true"
          >
          </el-slider>
          <el-input
            readonly
            v-model="currentLayerStep"
            size="mini"
            :min="1"
            :max="imgLayersNum"
          >
            <template slot="prepend">Layer</template>
          </el-input>
          <br/>
          <br/>
          <el-input
            v-model="imgWidth[currentLayer - 1]" size="mini" readonly>
            <template slot="prepend">Width</template>
          </el-input>
          <br/>
          <br/>
          <el-input
            v-model="imgHeight[currentLayer - 1]" size="mini" readonly>
              <template slot="prepend">Height</template>
          </el-input>
          <br/>
          <br/>
          <l-add-m-t-line v-if="this.$route.path === '/addmtline'">
          </l-add-m-t-line>
        </el-card>
      </el-col>
    </el-row>
    <div style="padding: 14px;">
      <span>Meta Data</span>
      <div class="bottom clearfix">
        <time class="time">{{ currentFileName }}</time>
      </div>
    </div>
  </el-card>
</template>

<script>
import BlockTag from './BlockTag';
import LAddMTLine from './LAddMTLine';

const rgbOptions = ['R', 'G', 'B'];
export default {
  props: [
    'buffer',
    'headerName',
  ],
  data() {
    return {
      currentLayer: 1,
      rgbOption: ['R'],
      rgb: rgbOptions,
      ifZoomSmoothing: true,
    };
  },
  components: {
    BlockTag, LAddMTLine,
  },
  computed: {
    imgBuffer() {
      return this.$store.getters.getBufferByLabel(this.buffer);
    },
    imgLayersNum() {
      return this.imgBuffer.value.length;
    },
    imgWidth() {
      return this.imgBuffer.width;
    },
    imgHeight() {
      return this.imgBuffer.height;
    },
    elcardStyle() {
      return {
        padding: 0,
        width: this.imgWidth,
        height: this.imgHeight,
      };
    },
    currentLayerStep() {
      return `${this.currentLayer} / ${this.imgLayersNum}`;
    },
  },
  created() {
    this.putMTImg('layer' + this.currentLayer);
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
    zoom(event) {
      let cID = String('layer' + (this.currentLayer));
      let zId = String('layerzoom' + (this.currentLayer));
      let canvas = document.getElementById(cID);
      let zoomctx = document.getElementById(zId).getContext('2d');
      let x = event.layerX;
      let y = event.layerY;
      if (this.ifZoomSmoothing) {
        zoomctx.imageSmoothingEnabled = this.ifZoomSmoothing;
        zoomctx.mozImageSmoothingEnabled = this.ifZoomSmoothing;
        zoomctx.webkitImageSmoothingEnabled = this.ifZoomSmoothing;
        zoomctx.msImageSmoothingEnabled = this.ifZoomSmoothing;
      }
      zoomctx.drawImage(canvas,
        Math.abs(x - 5),
        Math.abs(y - 5),
        10, 10,
        0, 0,
        200, 200);
    },
  },
};
</script>

<style>
.nobr {
  white-space: nowrap;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
