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
const UTIF = require('utif');
import fs from 'fs';

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
        this.tmp_gb_mt_imgs = path[0];
      });
    },
    handleSelectMAPImgs() {
      let ipc = this.$electron.ipcRenderer;
      ipc.send('open-file-dialog-map');

      ipc.on('selected-map', (event, path) => {
        this.tmp_gb_map_imgs = path[0];
      });
    },
    loadMTImgBuffer() {
      if (this.tmp_gb_mt_imgs) {
        // commit 'CHANGE_GT_MT_IMGS' from tmpVal
        this.$store.commit('CHANGE_GB_MT_IMGS', this.tmp_gb_mt_imgs);

        // convert .tif to rgbArray
        fs.readFile(this.tmp_gb_mt_imgs, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(data);
          let rgba = [];
          let width = [];
          let height = [];
          if (data) {
            let ifds = UTIF.decode(data);
            UTIF.decodeImages(data, ifds);
            for (let i = 0; i < ifds.length; i++) {
              width[i] = ifds[i].width;
              height[i] = ifds[i].height;
              rgba[i] = UTIF.toRGBA8(ifds[i]);
            }
            console.log('convert done');
          }

          // commit 'LOAD_MT_IMG_BUFFER" from rgbArray
          let payload = {
            width: width,
            height: height,
            rgba: rgba,
          };
          this.$store.commit('LOAD_MT_IMG_BUFFER', payload);
          console.log('commit done');
          console.log(rgba);
        });
      }
      this.$store.commit('CHANGE_GB_MAP_IMGS', this.tmp_gb_map_imgs);
    },
    loadMAPImgBuffer() {
      if (this.tmp_gb_mt_imgs) {
        // commit 'CHANGE_GT_MAP_IMGS' from tmpVal
        this.$store.commit('CHANGE_GB_MAP_IMGS', this.tmp_gb_map_imgs);

        // convert .tif to rgbArray
        fs.readFile(this.tmp_gb_map_imgs, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(data);
          let rgba = [];
          let width = [];
          let height = [];
          if (data) {
            let ifds = UTIF.decode(data);
            UTIF.decodeImages(data, ifds);
            for (let i = 0; i < ifds.length; i++) {
              width[i] = ifds[i].width;
              height[i] = ifds[i].height;
              rgba[i] = UTIF.toRGBA8(ifds[i]);
            }
            console.log('convert done');
          }

          // commit 'LOAD_MAP_IMG_BUFFER" from rgbArray
          let payload = {
            width: width,
            height: height,
            rgba: rgba,
          };
          this.$store.commit('LOAD_MAP_IMG_BUFFER', payload);
          console.log('commit done');
          console.log(rgba);
        });
      }
    },
    saveMTMAPImages() {
      // commit imgs PATH and BUffer
      this.loadMTImgBuffer();
      this.loadMAPImgBuffer();

      // show success img
      this.$message({
        showClose: true,
        message: 'Images saved!',
        type: 'success',
      });
    },
    loadVar() {
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
