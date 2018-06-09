<template>
  <div>
    <el-container style="height: 1000px;">
      <el-aside width="65px" style="background: white">
        <LSide/>
      </el-aside>
      <el-container>
        <el-header>
          <LHeader></LHeader>
        </el-header>
        <el-main style="background-color: #e4e4e4">
          <div style="background: white; padding: 10px;">
            <block-tag tag-name="Development Team"></block-tag>
            <el-row>
              <div v-for="(member) in members" :key="member.id">
                <el-col :span="7" :offset="member.id > 0 ? 1 : 0">
                  <el-card :body-style="{ padding: '0px' }">
                    <img :src="member.img"
                         class="image">
                    <div style="padding: 14px;">
                      <span>{{member.name}}</span>
                      <div class="bottom clearfix">
                        <time class="time">{{ member.role }}</time>
                        <el-button type="text" class="button">View More
                        </el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-main>
        <el-footer style="background-color: #e4e4e4">
          <LFooter/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import LSide from './basic/LSide';
  import LHeader from './basic/LHeader';
  import LFooter from './basic/LFooter';
  import BlockTag from './basic/BlockTag';

  let lx = require('../assets/liangxin.jpg');
  let ye1 = require('../assets/ye.jpg');
  let ye2 = require('../assets/ye2.jpg');

  export default {
    name: 'About',
    components: {LSide, LHeader, LFooter, BlockTag},
    data() {
      return {
        members: [
          {
            id: 0,
            name: 'Xin Liang',
            role: 'Lab Leader',
            img: lx,
          },
          {
            id: 1,
            name: 'Jianfeng He',
            role: 'Core Module Developer',
            img: ye1,
          },
          {
            id: 2,
            name: 'Zexuan Ye',
            role: 'UI Developer',
            // img: '../assets/ye2.jpg',
            img: ye2,
          },
        ],
      };
    },
    methods: {},
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
