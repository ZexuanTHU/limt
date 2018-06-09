import Vue from 'vue';
import Element from 'element-ui';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import SetUp from '@/components/SetUp';
import SaveLoadMat from '@/components/SaveLoadMat';
import Workspace from '@/components/Workspace';
import Tasks from '@/components/Tasks';
import About from '@/components/About';
import Script from '@/components/Script';
import LoadImages from '@/components/LoadImages';
import CalcTForm from '@/components/CalcTForm';
import AddMTLine from '@/components/AddMTLine';
import AddKymograph from '@/components/AddKymograph';
import CalcMTEnd from '@/components/CalcMTEnd';

Vue.use(Router);
Vue.use(Element);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/workspace',
      component: Workspace,
    },
    {
      path: '/setup',
      component: SetUp,
    },
    {
      path: '/saveloadmat',
      component: SaveLoadMat,
    },
    {
      path: '/loadimages',
      component: LoadImages,
    },
    {
      path: '/calctform',
      component: CalcTForm,
    },
    {
      path: '/tasks',
      component: Tasks,
    },
    {
      path: '/script',
      component: Script,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/addmtline',
      component: AddMTLine,
    },
    {
      path: '/addkymograph',

      component: AddKymograph,
    },
    {
      path: '/calcmtend',
      component: CalcMTEnd,
    },
  ],
});
