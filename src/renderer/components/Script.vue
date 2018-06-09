<template>
  <div>
    <div>
      <el-container style="height: 1000px;">
        <el-aside width="65px" style="background: white;">
          <LSide/>
        </el-aside>
        <el-container>
          <el-header style="padding: 0">
            <LHeader/>
          </el-header>
          <el-main style="background: #e4e4e4;">
            <el-select
              value="selectedOption"
              v-model="mode"
              placeholder="Please choose Language Mode">
              <el-option
                v-for="item in LangOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
            <el-button style="margin-left: 10px;" type="primary" plain>Save
            </el-button>
            <el-button style="margin-left: 10px;" type="success" plain>Open...
            </el-button>
            <br/>
            <br/>
            <div>
              <!-- <codemirror :options=options></codemirror> -->
            </div>
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
  // import {codemirror} from 'vue-codemirror-lite';

  // require('codemirror/mode/python/python');
  // require('codemirror/mode/javascript/javascript');
  // require('codemirror/mode/octave/octave');

  // require('codemirror/addon/hint/show-hint.js');
  // require('codemirror/addon/hint/show-hint.css');
  // require('codemirror/addon/hint/javascript-hint');
  export default {
    data() {
      return {
        mode: 'python',
        LangOptions: [
          {
            value: 'python',
            label: 'Python 3.x',
          },
          {
            value: 'javascript',
            label: 'Javascript',
          },
          {
            value: 'octave',
            label: 'Octave (MATLAB)',
            disabled: true,
          },
        ],
      };
    },
    computed: {
      options: function() {
        return {
          mode: this.mode,
          tabSize: 2,
          lineNumbers: true,
          lineWrapping: true,
          viewportMargin: Infinity,
        };
      },
    },
    components: {
      LSide, LHeader, LFooter,
      // codemirror,
    },
  };
</script>

<style>
  .CodeMirror-scroll {
    height: 700px;
  }

  .CodeMirror.cm-s-default.CodeMirror-wrap {
    height: 700px;
  }
</style>
