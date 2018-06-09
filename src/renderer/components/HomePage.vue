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
          <div align="center">
            <img src="../assets/llmt2.png"/>
            <br/>
            LLMT - Liang Lab Microtube Toolkit
          </div>
          <br/>
          <div style="padding:0px 10px 0px 10px; background: white;">
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
              <el-collapse-item title="High Performance Backend" name="1">
                <div>Core module was developed in MATLAB</div>
                <div>Convert to Python backend progressively</div>
              </el-collapse-item>
              <el-collapse-item title="Modern Frontend UI" name="2">
                <div>Control Feedback：Let user feel their operation through
                  modern UI
                </div>
                <div>Page Feedback：Present current state through view change
                  after user operation
                </div>
              </el-collapse-item>
              <el-collapse-item title="Open Source" name="3">
                <div>Software released under MIT license</div>
              </el-collapse-item>
              <el-collapse-item title="Efficiency & Controllability" name="4">
                <div>Simpler Workflow：Design simple, elegant workflow</div>
                <div>Clear manual: Make user understand How-to ASAP</div>
                <div>User Decision：Offer advice or pop-up but not make decision
                  for user
                </div>
                <div>Controllability: User can feel free to redo, terminate or
                  quit the operation session
                </div>
              </el-collapse-item>
            </el-collapse>
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

  export default {
    name: 'HomePage',
    data() {
      return {
        activeNames: '',
      };
    },
    components: {
      LSide,
      LHeader,
      LFooter,
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
    },
  };
</script>

<style>
</style>
