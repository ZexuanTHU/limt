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
              <el-col :span="4">
                <block-tag tag-name="Image"></block-tag>
                <el-card :body-style="{ padding: '0px' }">
                  <img src="../assets/mt.png" class="image">
                  <div style="padding: 14px;">
                    <span>Meta Data</span>
                    <div class="bottom clearfix">
                      <time class="time">{{ currentFileName }}</time>
                      <br/>
                      <br/>
                      <el-button type="text" class="button">View Frames
                      </el-button>
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
                    <span>Actions</span>
                    <el-tooltip content="Done">
                    <el-button style="float: right; padding: 5px;" circle
                               icon="el-icon-check" type="success">
                    </el-button>
                    </el-tooltip>
                  </div>
                  <el-button type="primary" icon="el-icon-sort">
                    Calculate
                  </el-button>
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

  export default {
    data() {
      return {
        currentFileUrl: '',
        currentFileName: '_Pig Tub 12 uM 10% Alexa647 label_200 nM EB1_50 nM ' +
        'chTOG-RFP_laser488 10%_laser561 10%_laser640 7%_exposuretime 100ms_' +
        'intervaltime 1s_35C--3_',
        layersValue: (130 / this.layersNum) * 100,
        layersNum: 1000,
      };
    },
    components: {
      LHeader, LSide, LFooter, BlockTag,
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
