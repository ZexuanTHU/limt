<template>
  <div>
    <div>
      <el-container style="height: 1000px;">
        <el-aside width="65px" style="background: white;">
          <LSide/>
        </el-aside>
        <el-container>
          <el-header style="padding: 0">
            <LHeader/>
          </el-header>
          <el-main style="background: #e4e4e4;">
            <div style="background: white; padding: 10px;">
              <block-tag tag-name="MATLAB Workspace"></block-tag>
              <WorkspaceTable></WorkspaceTable>
            </div>
            <br/>
            <div style="background: white; padding: 10px;">
              <el-row>
                <block-tag tag-name="Current MT / MAP Images"></block-tag>
                <el-col :span="11.5">
                  <l-mul-canvas header-name="MT Image" buffer="mt_img_buffer">
                  </l-mul-canvas>
                </el-col>
                <el-col :span="11.5" :offset="1">
                  <l-mul-canvas header-name="MAP Image" buffer="map_img_buffer">
                  </l-mul-canvas>
                </el-col>
              </el-row>
            </div>
          </el-main>
          <el-footer style="background: #e4e4e4;">
            <LFooter/>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import LSide from './basic/LSide';
import LHeader from './basic/LHeader';
import LFooter from './basic/LFooter';
import WorkspaceTable from './basic/WorkspaceTable';
import BlockTag from './basic/BlockTag';
import LCanvas from './basic/LCanvas';
import LMulCanvas from './basic/LMulCanvas';

export default {
  data() {
    return {
      currentFileUrl: '',
      currentFileName:
        '_Pig Tub 12 uM 10% Alexa647 label_200 nM EB1_50 nM ' +
        'chTOG-RFP_laser488 10%_laser561 10%_laser640 7%_exposuretime 100ms_' +
        'intervaltime 1s_35C--3_',
    };
  },
  mounted() {
    this.putMTImg();
    this.putMAPImg();
  },
  methods: {
    putMTImg() {
      let c = document.getElementById('mt-img');
      let ctx = c.getContext('2d');
      let buffer = this.$store.getters.getBufferByLabel('mt_img_buffer');
      let img = buffer.value[0];
      let imgClamp = new Uint8ClampedArray(img);
      console.log(imgClamp.length);
      let imgData = new ImageData(imgClamp, 2 * 85, 2 * 256);
      ctx.putImageData(imgData, 0, 0);
    },
    putMAPImg() {
      let c = document.getElementById('map-img');
      let ctx = c.getContext('2d');
      let img = this.$store.getters.getBufferByLabel('map_img_buffer').value[0];
      let imgClamp = new Uint8ClampedArray(img);
      console.log(imgClamp.length);
      let imgData = new ImageData(imgClamp, 2 * 85, 2 * 256);
      ctx.putImageData(imgData, 0, 0);
    },
  },
  computed: {
  },
  components: {
    LSide,
    LHeader,
    LFooter,
    WorkspaceTable,
    BlockTag,
    LCanvas,
    LMulCanvas,
  },
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.canvas {
  width: 100%;
  display: block;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
