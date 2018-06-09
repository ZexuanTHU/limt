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
            <block-tag tag-name="Load Bead Files"></block-tag>
            <el-upload
              show-file-list
              multiple
              limit="30"
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :before-remove="beforeRemove"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">Select...
              </el-button>
              <el-button style="margin-left: 10px;" size="small" type="success"
                         @click="submitUpload">Calc TForm
              </el-button>
              <div slot="tip" class="el-upload__tip">
                <p>Allow .tif images up to 20MB</p>
                <p>Support multiple selection</p>
              </div>
            </el-upload>
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
        fileList: [],
      };
    },
    components: {
      LHeader, LSide, LFooter, BlockTag,
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
        this.$message({
          showClose: true,
          message: 'TForm calculation done',
          type: 'success',
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`You selected ${files.length} files this time,
        you selected ${files.length + fileList.length} files at all,
        already exceed the limitation`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    },
  };
</script>

<style>
</style>
