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
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" style="width: 80px;" size="small">
                Select...
              </el-button>
              <el-button style="margin-left: 10px; width: 80px;" size="small"
                         type="success"
                         @click="submitUpload">Load
              </el-button>
              <div slot="tip" class="el-upload__tip">
                Allow .mat file within 500kb size
              </div>
            </el-upload>
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
        fileList: [{
          name: 'pic1.mat',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        }, {
          name: 'pic2.mat',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        }],
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
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
