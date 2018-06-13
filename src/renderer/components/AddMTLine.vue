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
            <el-dialog
              title="Image Viewer"
              :visible.sync="dialogVisible"
            >
              <l-mul-canvas
               buffer="mt_img_buffer"
               header-name="MT Image">
              </l-mul-canvas>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                  Save
                </el-button>
              </span>
            </el-dialog>
            <el-row>
              <el-col :span="4">
                <block-tag tag-name="Image"></block-tag>
                <el-card :body-style="{ padding: '0px' }">
                  <img src="../assets/mt.png" class="image">
                  <div style="padding: 14px;">
                    <div class="bottom clearfix">

                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="2">
                <p></p>
              </el-col>
              <el-col :span="8">
                <block-tag tag-name="Operation Space"></block-tag>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Image Viewer</span>
                    <el-tooltip content="Done">
                      <el-button
                      @click="dialogVisible = true"
                      style="float: right; padding: 5px;" circle
                                 icon="el-icon-search" type="success">
                      </el-button>
                    </el-tooltip>
                  </div>
                  <div class="block">
                    <span class="demonstration">Layers</span>
                    <el-slider v-model="layersValue"></el-slider>
                  </div>
                  <br/>
                  <el-button-group>
                    <el-button type="primary" icon="el-icon-plus">
                      Add Line
                    </el-button>
                    <el-button type="primary" icon="el-icon-edit">Draw Line
                    </el-button>
                  </el-button-group>
                </el-card>
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
        layersValue: (130 / this.layersNum) * 100,
        layersNum: 1000,
        dialogVisible: false,
      };
    },
    components: {
      LHeader, LSide, LFooter, BlockTag, LMulCanvas,
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
