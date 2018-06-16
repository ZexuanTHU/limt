<template>
  <div>
    <el-container style="height: 1000px">
      <el-aside width="65px" style="background: white">
        <LSide/>
      </el-aside>
      <el-container>
        <el-header>
          <LHeader/>
        </el-header>
        <el-main style="background-color: #e4e4e4">
          <div style="background: white; padding: 10px;">
            <el-row>
              <el-col :span="20">
                <block-tag tag-name="Add Kymograph"></block-tag>
                  <l-mul-canvas
                    header-name="MT Image"
                    buffer="mt_img_buffer"
                  >
                  </l-mul-canvas>
              </el-col>
            </el-row>
          </div>
        </el-main>
        <el-footer style="background: #e4e4e4">
          <LFooter/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import LHeader from './basic/LHeader';
  import LSide from './basic/LSide';
  import LFooter from './basic/LFooter';
  import BlockTag from './basic/BlockTag';
  import LMulCanvas from './basic/LMulCanvas.vue';

  export default {
    data() {
      return {
        currentFileUrl: '',
        currentFileName: '_Pig Tub 12 uM 10% Alexa647 label_200 nM EB1_50 nM ' +
        'chTOG-RFP_laser488 10%_laser561 10%_laser640 7%_exposuretime 100ms_' +
        'intervaltime 1s_35C--3_',
        brightnessValue: 50,
        contrastValue: 40,
        kymoNum: 1,
      };
    },
    components: {
      LHeader, LSide, LFooter, BlockTag, LMulCanvas,
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
    clear: both
  }
</style>
