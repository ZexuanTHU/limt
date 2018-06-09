<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        :collapse="ifCollapse"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="ifRouter">
        <el-menu-item index="0" route="/">
          <i class="el-icon-llmt-home"></i>
          <span slot="title">LLMT Homepage</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-rank"></i>
            <span>MT Workflow</span>
          </template>
          <el-menu-item-group>
            <template slot="title">Pre Settings</template>
            <el-menu-item index="1-1" route="/setup">
              <i class="el-icon-setting"></i>
              Set Up
            </el-menu-item>
            <el-menu-item index="1-2" route="/saveloadmat">
              <i class="el-icon-document"></i>
              Load/Save .mat
            </el-menu-item>
            <el-menu-item index="1-3" route="/loadimages">
              <i class="el-icon-upload2"></i>
              Load Images
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">MT Toolkit</template>
            <el-submenu index="1-4">
              <template slot="title">Correction</template>
              <el-menu-item index="1-4-1" route="/calctform">CalcTForm
              </el-menu-item>
              <el-menu-item index="1-4-2">Correct Red</el-menu-item>
              <el-menu-item index="1-4-3">Inv Corr Red</el-menu-item>
              <el-menu-item index="1-4-4">Correct Drift</el-menu-item>
            </el-submenu>
            <el-submenu index="1-5">
              <template slot="title">MT Operations</template>
              <el-menu-item index="1-5-1" route="/addmtline">Add MT Line
              </el-menu-item>
              <el-menu-item index="1-5-2" route="/calcmtend">Calc MT End
              </el-menu-item>
              <el-menu-item index="1-5-3" route="/addkymograph">Add Kymorgraph
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1-6">
              <template slot="title">Analysis</template>
              <el-menu-item index="1-6-1">Analysis</el-menu-item>
              <el-menu-item index="1-6-2">Other Analysis</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        ifCollapse: true,
        ifRouter: true,
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>

<style>
  @import "../../assets/icon/iconfont.css";
</style>
