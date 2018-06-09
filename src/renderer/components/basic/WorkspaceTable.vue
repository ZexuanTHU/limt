<template>
  <el-table
    :data="workspaceData"
    stripe
    size="mini"
  >
    <el-table-column
      prop="label"
      label="Name">
    </el-table-column>
    <el-table-column
      prop="value"
      label="Value">
    </el-table-column>
    <el-table-column
      prop="disp"
      label="Description">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="View"
      width="100">
      <template slot-scope="scope">
        <el-button @click="dialogVisible = true" type="text"
                   size="small">查看
        </el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
                        <el-button
                          @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary"
                                   @click="dialogVisible = false">确 定
                        </el-button>
                      </span>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            done();
          })
          .catch((_) => {
          });
      },
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    computed: {
      workspaceData() {
        return this.$store.state.MTWorkspace.states;
      },
    },
  };
</script>
