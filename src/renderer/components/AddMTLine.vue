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
              <el-col :span="16">
                <block-tag tag-name="Image"></block-tag>
                <l-mul-canvas header-name="MT Image" buffer="mt_img_buffer">
                  <l-add-m-t-line slot="l-add-m-t-line"></l-add-m-t-line>
                </l-mul-canvas>
              </el-col>
            </el-row>
            <l-canvas></l-canvas>
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
  import LAddMTLine from './basic/LAddMTLine.vue';
  import LCanvas from './basic/LCanvas.vue';

  export default {
    data() {
      return {
        layersValue: (130 / this.layersNum) * 100,
        layersNum: 1000,
        dialogVisible: false,
      };
    },
    components: {
      LHeader, LSide, LFooter, BlockTag, LMulCanvas, LAddMTLine, LCanvas,
    },
    methods: {
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
