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
          <block-tag tag-name="Load MT Image"></block-tag>
          <!-- <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
            :http-request="loadMTFile"
            :auto-upload="false">
            <el-button slot="trigger" style="width: 80px;" size="small">
              Select...
            </el-button>
            <el-button style="margin-left: 10px; width: 80px;" size="small"
                       type="success"
                       @click="loadMTFile">Load
            </el-button>
            <div slot="tip" class="el-upload__tip">
              Allow .mat file within 500kb size
            </div>
          </el-upload> -->
          <input type="file" id="mtfile" @click="handleChange">
          <el-button @click="handleSelectFile">Select...</el-button>
          <p>{{gb_mt_img}}</p>
        </div>
        <br/>
        <!--<div style="background: white; padding: 10px;">-->
          <!--<block-tag tag-name="Load MAP Image"></block-tag>-->
          <!--<el-upload-->
            <!--class="upload-demo"-->
            <!--ref="upload"-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--:file-list="fileList"-->
            <!--:auto-upload="false">-->
            <!--<el-button slot="trigger" style="width: 80px;" size="small">-->
              <!--Select...-->
            <!--</el-button>-->
            <!--<el-button style="margin-left: 10px; width: 80px;"-->
                       <!--size="small"-->
                       <!--type="success"-->
                       <!--@click="submitUpload">Load-->
            <!--</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">-->
              <!--Allow .mat file within 500kb size-->
            <!--</div>-->
          <!--</el-upload>-->
        <!--</div>-->
        <br/>
        <div style="background: white; padding: 10px;">
          <block-tag tag-name="Load MT / MAP Var from Workspace"></block-tag>
          <div>
            <el-transfer
              style="text-align: left; display: inline-block"
              v-model="transferOptions"
              filterable
              filter-placeholder="Search var name here"
              :left-default-checked="[2, 3]"
              :right-default-checked="[1]"
              :render-content="renderFunc"
              :titles="['Source', 'Target']"
              :format="{
                noChecked:'${total}',
                hasChecked:'${checked}/${total}'}"
              :data="generateData">
              <el-button class="transfer-footer" slot="left-footer" plain
                         type="danger" size="small">Sort
              </el-button>
              <el-button class="transfer-footer" slot="right-footer"
                         type="success" size="small" @click="varSubmitload">
                Load
              </el-button>
            </el-transfer>
          </div>
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
import os from 'os';
import {mapState} from 'vuex';

export default {
  components: {
    LHeader,
    LSide,
    LFooter,
    BlockTag,
  },
  data() {
    return {
      fileList: [
        {
          name: 'pic1.mat',
        },
      ],
      renderFunc(h, option) {
        // eslint-disable-next-line
        return <span>{ option.key } - { option.label }</span>;
      },
      transferOptions: [1, 4],
    };
  },
  computed: {
    ...mapState({
      generateData: (state) => {
        return state.MTWorkspace.states;
      },
      gb_mt_img: (state) => {
        return state.MTWorkspace.states.slice(15, 16)[0].value;
      },
    }),
  },
  methods: {
    handleChange() {
      // let files = document.getElementById('mtfile').files[0].path;
      this.$electron.remote.shell.showItemInFolder(os.homedir());
    },
    handleSelectFile() {
      let ipc = this.$electron.ipcRenderer;
      ipc.send('open-file-dialog');

      ipc.on('selected-directory', (event, path) => {
        this.gb_mt_img = path;
      });
    },
    readFile(filePath) {
      this.$electron.remote.fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          this.$message({
            message: 'Error during reading file: ' + err.message,
            type: 'error',
          });
          return;
        }
      });
    },
    loadMTFile() {
      console.log(fileObj);
      this.$refs.upload.submit();
      this.$message({
        showClose: true,
        message: 'Load success',
        type: 'success',
      });
    },
    varSubmitload() {
      this.$message({
        showClose: true,
        message: 'Load success',
        type: 'success',
      });
    },
  },
};
</script>

<style>
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>
