<template>
  <div>
    <el-container>
      <el-aside width="65px">
        <SideBar/>
      </el-aside>
      <el-container style="height: 1000px; background-color: #e4e4e4">
        <el-header style="padding: 0px">
          <LHeader/>
        </el-header>
        <el-main>
          <div style="background: white; padding: 10px;">
            <block-tag tag-name="Load Workspace (.mat)"></block-tag>
            <nobr>
              <el-input size="small" placeholder=".mat File"
              v-model="tmp_mat_file" style="width: 30%"></el-input>
              <el-button type="primary" plain size="small"
              @click="handleSelectMATFile">
                Select...
              </el-button>
            </nobr>
          </div>
          <br/>
          <div style="background: white; padding: 10px;">
            <block-tag tag-name="Current Workspace"></block-tag>
            <WorkspaceTable></WorkspaceTable>
          </div>
        </el-main>
        <el-footer>
          <LFooter/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LHeader from './basic/LHeader';
import SideBar from './basic/LSide';
import LFooter from './basic/LFooter';
import WorkspaceTable from './basic/WorkspaceTable';
import BlockTag from './basic/BlockTag';

export default {
  name: 'SaveLoadMat',
  components: {
    SideBar,
    LHeader,
    LFooter,
    WorkspaceTable,
    BlockTag,
  },
  data() {
    return {
      tmp_mat_file: '',
    };
  },
  methods: {
    handleSelectMATFile() {
      let ipc = this.$electron.ipcRenderer;
      ipc.send('open-file-dialog-mat');

      ipc.on('selected-mat', (event, path) => {
        console.log(path);
        this.tmp_mat_file = path;
      });
    },
    loadMAT() {
      let that = this;
      setTimeout(function() {
        that.$notify({
          title: 'New MATLAB workspace loaded',
          message: 'You can check it in the Workspace',
          duration: 0,
          offset: 25,
        });
      }, 2000);
      this.$message({
        showClose: true,
        message: 'Load success',
        type: 'success',
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>
