import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    gb: [
      {
        'key': 0, 'value': '100', 'disp': 'Scale',
        'label': 'GB_NM_PER_PIXEL', 'units': 'nm/pixel',
        'size': [
          1,
          4,
        ],
        'bytes': 8,
        'class': 'char',
        'global': true,
        'sparse': false,
        'complex': false,
        'nesting': {
          'function': '',
          'level': 0,
        },
        'persistent': false,
      },
      {
        'key': 1, 'value': '1200', 'disp': 'Time Interval',
        'label': 'GB_TIME_INTERVAL', 'units': 's',
        'size': [
          1,
          4,
        ],
        'bytes': 8,
        'class': 'char',
        'global': true,
        'sparse': false,
        'complex': false,
        'nesting': {
          'function': '',
          'level': 0,
        },
        'persistent': false,
      },
      {
        'key': 2, 'value': '', 'disp': '',
        'label': 'gb_blurred_mt_imgs',
        'size': [
          0,
          0,
        ],
        'bytes': 0,
        'class': 'double',
        'global': true,
        'sparse': false,
        'complex': false,
        'nesting': {
          'function': '',
          'level': 0,
        },
        'persistent': false,
      },
    ],
  },
  getters: {
    getGBByLabel: (state) => (label) => {
      return state.gb.find((gbVal) => gbVal.label === label);
    },
  },
  mutations: {
    CHANGE_GB_NM_PER_PIXEL(state, payload) {
      let GB_NM_PER_PIXEL =
        (state.gb.find((gbVal) => gbVal.label === 'GB_NM_PER_PIXEL'));
      GB_NM_PER_PIXEL.value = payload;
    },
    CHANGE_GB_TIME_INTERVAL(state, payload) {
      let GB_TIME_INTERVAL =
        (state.gb.find((gbVal) => gbVal.label === 'GB_TIME_INTERVAL'));
      GB_TIME_INTERVAL.value = payload;
    },
    CHANGE_GB_MT_IMGS(state, payload) {
      state.gb_mt_imgs.value = payload;
    },
  },
});
