<template>
  <div>
    <div>
      <el-container style="height: 1000px;">
        <el-aside width="65px" style="background: white;">
          <LSide/>
        </el-aside>
        <el-container>
          <el-header style="padding: 0px">
            <LHeader/>
          </el-header>
          <el-main style="background: #e4e4e4;">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>Auto Calc MT Length</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                  Import WorkSpace
                </el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'Step ' + o }}
              </div>
            </el-card>
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

  export default {
    components: {LSide, LHeader, LFooter},
  };
</script>
