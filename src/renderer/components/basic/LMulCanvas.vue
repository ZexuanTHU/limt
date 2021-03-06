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
      <el-col :span=8 :offset=1>
        <block-tag tag-name="Image"></block-tag>
        <el-card :body-style="elcardStyle" shadow="hover">
          <!-- <el-row> -->
            <!-- <el-col span="12"> -->
              <canvas
                :id="cID"
                :width="imgWidth[currentLayer - 1]"
                :height="imgHeight[currentLayer - 1]"
                @mousemove="handleMouseMove"
                @mouseup="ifMouseDown = false"
                @mousedown="ifMouseDown = true">
              </canvas>
            <!-- </el-col> -->
            <!-- <el-col span="12"> -->
              <canvas
                :id="zID"
                class="zoom-canvas"
                width="150px"
                height="150px"
                style="border: 1px solid white"
              >
              </canvas>
            <!-- </el-col> -->
          <!-- </el-row> -->
        </el-card>
      </el-col>
      <el-col :span=13 :offset=1>
        <block-tag tag-name="Actions"></block-tag>
        <el-card shadow="hover">
          <el-form>
            <el-form-item>
              <el-checkbox-group v-model="rgbOption" size="mini">
                <el-checkbox-button
                v-for="c in rgb"
                :label="c"
                :key="c">{{c}}
                </el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-switch
                v-model="ifZoomSmoothing"
                active-text="Zoom Smoothing"
              >
              </el-switch>
            </el-form-item>
            <el-form-item>
                  <el-tag type="info" size="medium">Layer</el-tag>
                  <!-- <el-input
                    readonly
                    v-model="currentLayerStep"
                    size="mini"
                    :min="1"
                    :max="imgLayersNum"
                  >
                  </el-input> -->
                  <el-slider
                    v-model="currentLayer"
                    :max="imgLayersNum"
                    show-input
                  >
                  </el-slider>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col :span="11">
                  <el-tag type="info" size="medium">Width</el-tag>
                  <el-input
                    v-model="imgWidth[currentLayer - 1]" size="mini" readonly>
                  </el-input>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-tag type="info" size="medium">Height</el-tag>
                  <el-input
                    v-model="imgHeight[currentLayer - 1]" size="mini" readonly>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <l-add-m-t-line v-if="this.$route.path === '/addmtline'">
              </l-add-m-t-line>
            </el-form-item>
            <el-form-item>
              <l-add-kymograph v-if="this.$route.path === '/addkymograph'">
              </l-add-kymograph>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <div style="padding: 14px;">
      <div class="bottom clearfix">
      </div>
    </div>
  </el-card>
</template>

<script>
import BlockTag from './BlockTag';
import LAddMTLine from './LAddMTLine';
import LAddKymograph from './LAddKymograph';

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
      ifMouseDown: false,
    };
  },
  components: {
    BlockTag, LAddMTLine, LAddKymograph,
  },
  computed: {
    cID() {
      return 'layer' + this.currentLayer;
    },
    zID() {
      return 'layerzoom' + this.currentLayer;
    },
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
    ifDrawingLine() {
      return this.$store.getters.getMulCanvasState('if_drawing_line').value;
    },
    contrast() {
      return this.$store.getters.getMulCanvasState('contrast').value;
    },
    brightness() {
      return this.$store.getters.getMulCanvasState('brightness').value;
    },
    kymographNum() {
      return this.$store.getters.getMulCanvasState('kymograph_num').value;
    },
  },
  created() {
    this.putMTImg(this.cID);
  },
  watch: {
    currentLayer() {
      this.putMTImg(this.cID);
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
        let c = document.getElementById(cID);
        let ctx = c.getContext('2d');
        let imgClamp = new Uint8ClampedArray(img);
        let imgData = new ImageData(imgClamp, 2 * 85, 2 * 256);
        ctx.putImageData(imgData, 0, 0);
      });
    },
    zoom(x, y, canvas, zID) {
      let zoomDiv = document.getElementById(this.zID);
      let zoomctx = zoomDiv.getContext('2d');

      if (this.ifZoomSmoothing) {
        zoomctx.imageSmoothingEnabled = this.ifZoomSmoothing;
        zoomctx.mozImageSmoothingEnabled = this.ifZoomSmoothing;
        zoomctx.webkitImageSmoothingEnabled = this.ifZoomSmoothing;
        zoomctx.msImageSmoothingEnabled = this.ifZoomSmoothing;
      }
      // zoomDiv.style.left = x + 'px';
      zoomDiv.style.top = y + 'px';
      zoomctx.drawImage(canvas,
        Math.abs(x - 5),
        Math.abs(y - 5),
        10, 10,
        0, 0,
        200, 200);
    },
    drawLine(x, y, canvas) {
      if (this.ifMouseDown) {
        let ctx = canvas.getContext('2d');
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#F63E02';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    },
    handleMouseMove(event) {
      let canvas = document.getElementById(this.cID);
      let x = event.layerX;
      let y = event.layerY;
      this.zoom(x, y, canvas, this.zID);
      if (this.ifDrawingLine) {
        this.drawLine(x, y, canvas);
      }
    },
    handleBrightnessContrast(__src, __brightness, __contrast) {
      if (__src.type === 'CV_RGBA') {
        let sData = __src.data;
        let width = __src.col;
        let height = __src.row;
        let dst = new Mat(height, width, CV_RGBA);
        let dData = dst.data;
        let brightness = Math.max(-255, Math.min(255, __brightness || 0));
        let contrast = Math.max(-255, Math.min(255, __contrast || 0));

        let gray = cvtColor(__src, CV_RGBA2GRAY);
        let allValue = 0;
        let gData = gray.data;
        let [y, x, c] = [null, null, null];

        for (y = height; y--;) {
          for (x = width; x--;) {
            allValue += gData[y * width + x];
          }
        }

        let tmp = (allValue / (height * width)) | 0;
        let [offset, gAverage] = [tmp, tmp];

        for (y = height; y--;) {
          for (x = width; x--;) {
            offset = (y * width + x) * 4;
            dData[offset] = sData[offset] + brightness;
            dData[offset + 1] = sData[offset + 1] + brightness;
            dData[offset + 2] = sData[offset + 2] + brightness;

            if (contrast >= 0) {
              for (c = 3; c--;) {
                if (dData[offset + c] >= gAverage) {
                  dData[offset + c] = dData[offset + c]
                    + (255 - gAverage) * contrast / 255;
                } else {
                  dData[offset + c] = dData[offset + c]
                    - (gAverage * contrast / 255);
                }
              }
            } else {
              dData[offset] = dData[offset] + (dData[offset] - gAverage)
                * contrast / 255;
              dData[offset + 1] = dData[offset + 1] + (dData[offset + 1]
                - gAverage) * contrast / 255;
              dData[offset + 2] = dData[offset + 2] + (dData[offset + 2]
                - gAverage) * contrast / 255;
            }

            dData[offset + 3] = 255;
          }
        }
      }
      return dst;
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

.zoom-canvas {
  border-radius: 75px;
  position: absolute;
}
</style>
