<template>
  <div>
    <el-container style="height: 1000px">
      <el-aside width="65px">
        <SideBar/>
      </el-aside>
      <el-container>
        <el-header>
          <LHeader/>
        </el-header>
        <el-main style="background-color: #e4e4e4; ">
          <div style="background: white; padding: 10px;">
            <el-row class="demo-autocomplete">
              <el-col :span="12">
                <BlockTag tag-name="Global Parameters Settings"></BlockTag>
                <el-steps :active="active" finish-status="success">
                  <el-step title="Set Scale"></el-step>
                  <el-step title="Set Time Interval"></el-step>
                  <el-step title="Check Configuration"></el-step>
                </el-steps>
                <br/>
                <div class="sub-title"></div>
                <span>
                  <el-autocomplete
                    class="inline-input"
                    v-model="inputValue"
                    :fetch-suggestions="querySearch"
                    placeholder="Please input here"
                    v-if="active===0 || active===1"
                  >
                  </el-autocomplete>
                  <template v-else>
                    <span v-if="active===2">
                      <el-tag>Please check your configuration before saving
                      </el-tag>
                    </span>
                    <el-table
                      :data="states"
                    >
                    <el-table-column
                      prop="disp"
                      label="Name"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      label="Value"
                    >
                    </el-table-column>
                  </el-table>
                  </template>
                </span>
                <span v-if="this.active===0">nm/pixel</span>
                <span v-else-if="this.active===1">s</span>
                <span v-else></span>
                <br/>
                <el-button v-if="active<=3"
                           style="margin-top: 12px;"
                           @click="next">
                  <span v-if="active===0 || active===1">Next</span>
                  <span v-else-if="active===2">Save</span>
                  <span v-else-if="active===3">Reset</span>
                </el-button>
              </el-col>
            </el-row>
          </div>
          <br/>
          <div style="background: white; padding: 10px;">
            <block-tag tag-name="Current Parameters"></block-tag>
            <el-table
              :data="states"
            >
              <el-table-column
                prop="disp"
                label="Name"
              >
              </el-table-column>
              <el-table-column
                prop="label"
                label="Var"
              >
              </el-table-column>
              <el-table-column
                prop="value"
                label="Value"
              >
              </el-table-column>
              <el-table-column
                prop="units"
                label="Units"
              >
              </el-table-column>
            </el-table>
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
import SideBar from './basic/LSide';
import LFooter from './basic/LFooter';
import BlockTag from './basic/BlockTag';
import {mapState} from 'vuex';

export default {
  name: 'SetUp',
  components: {
    SideBar: SideBar,
    LHeader: LHeader,
    LFooter: LFooter,
    BlockTag: BlockTag,
  },
  data() {
    return {
      inputValue: '',
      active: 0,
    };
  },
  computed: {
    // states() {
    //   return this.$store.state.MTWorkspace.states.slice(0, 2);
    // },
    ...mapState({
      states: (state) => {
        return state.MTWorkspace.states.slice(0, 2);
      },
    }),
  },
  methods: {
    next() {
      if (this.active <= 1) {
        if (this.inputValue === '') {
          this.$message({
            showCLose: true,
            message: 'You cannot skip this step',
            type: 'error',
          });
        } else {
          this.states[this.active].value = this.inputValue;
          this.active++;
        }
      } else if (this.active === 2) {
        this.active++;
        this.$message({
          showClose: true,
          message: 'Your configuration already saved!',
          type: 'success',
        });
      } else {
        this.active = 0;
        this.$message({
          showClose: true,
          message: 'Please reset your configuration!',
        });
      }
    },
    handleEmpty(inputValue) {
      if (inputValue === '') {
        this.$message({
          showClose: true,
          message: 'You cannot skip this step',
          type: 'error',
        });
      }
    },
    querySearch(queryString, cb) {
      let states = this.states;
      let results = queryString
        ? states.filter(this.createFilter(queryString))
        : states;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (states) => {
        // eslint-disable-next-line max-len
        return (
          states.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [
        {name: 'Scale', value: '1', units: 'nm/pixel'},
        {name: 'Time Interval', value: '3', units: 's'},
      ];
    },
  },
  mounted() {
    this.states = this.loadAll();
  },
};
</script>
