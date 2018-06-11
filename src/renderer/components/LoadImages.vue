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
          <block-tag tag-name="Load MT / MAP Images"></block-tag>
          <div>
              <nobr>
                <el-input size="small" placeholder="MT Images"
                v-model="tmp_gb_mt_imgs" style="width: 30%"></el-input>
                <el-button type="primary" plain size="small"
                @click="handleSelectMTImgs">
                  Select...
                </el-button>
              </nobr>
              <br/>
              <br/>
              <nobr>
                <el-input size="small" placeholder="MAP Images"
                v-model="tmp_gb_map_imgs" style="width: 30%"></el-input>
                <el-button type="primary" plain size="small"
                @click="handleSelectMAPImgs">
                  Select...
                </el-button>
              </nobr>
          </div>
          <br/>
          <el-button type="success" size="small" @click="saveMTMAPImages">
            Load
          </el-button>
        </div>
        <br/>
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
              :render-content="renderFunc"
              :titles="['Source', 'Target']"
              :format="{
                noChecked:'${total}',
                hasChecked:'${checked}/${total}'}"
              :data="gb">
              <el-button class="transfer-footer" slot="left-footer" plain
                         type="danger" size="small">Sort
              </el-button>
              <el-button class="transfer-footer" slot="right-footer"
                         type="success" size="small" @click="loadVar">
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
import {mapState, mapGetters} from 'vuex';

export default {
  components: {
    LHeader,
    LSide,
    LFooter,
    BlockTag,
  },
  data() {
    return {
      tmp_gb_mt_imgs: '',
      tmp_gb_map_imgs: '',
      renderFunc(h, option) {
        // eslint-disable-next-line
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      transferOptions: [],
    };
  },
  computed: {
    gb_mt_imgs() {
      return this.getGBByLabel('gb_mt_imgs').value;
    },
    gb_map_imgs() {
      return this.getGBByLabel('gb_map_imgs').value;
    },
    ...mapState({
      gb: (state) => {
        return state.gb;
      },
    }),
    ...mapGetters([
      'getGBByLabel',
    ]),
  },
  methods: {
    handleSelectMTImgs() {
      let ipc = this.$electron.ipcRenderer;
      ipc.send('open-file-dialog-mt');

      ipc.on('selected-mt', (event, path) => {
        console.log(path);
        this.tmp_gb_mt_imgs = path;
      });
    },
    handleSelectMAPImgs() {
      let ipc = this.$electron.ipcRenderer;
      ipc.send('open-file-dialog-map');

      ipc.on('selected-map', (event, path) => {
        this.tmp_gb_map_imgs = path;
      });
    },
    saveMTMAPImages() {
        this.$store.commit('CHANGE_GB_MT_IMGS', this.tmp_gb_mt_imgs);
        this.$store.commit('CHANGE_GB_MAP_IMGS', this.tmp_gb_map_imgs);
        this.$message({
          showClose: true,
          message: 'Images saved!',
          type: 'success',
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
    loadvar() {
      this.$store.commit('CHANGE_GB_MT_IMGS', this.transferOptions[0]);
      this.$store.commit('CHANGE_GB_MAP_IMGS', this.transferOptions[1]);
      this.$message({
        showClose: true,
        message: 'Selected var loaded!',
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
