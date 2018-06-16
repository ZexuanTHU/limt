import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

// @ts-ignore
Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV === 'production',
  state: {
    gb: [
      {
        key: 0,
        value: '100',
        disp: 'Scale',
        label: 'GB_NM_PER_PIXEL',
        units: 'nm/pixel',
        size: [1, 4],
        bytes: 8,
        class: 'char',
        global: true,
        sparse: false,
        complex: false,
        nesting: {
          function: '',
          level: 0,
        },
        persistent: false,
      },
      {
        key: 1,
        value: '1200',
        disp: 'Time Interval',
        label: 'GB_TIME_INTERVAL',
        units: 's',
        size: [1, 4],
        bytes: 8,
        class: 'char',
        global: true,
        sparse: false,
        complex: false,
        nesting: {
          function: '',
          level: 0,
        },
        persistent: false,
      },
      {
        key: 2,
        value: '',
        disp: 'MT Image URL',
        label: 'gb_mt_imgs',
        size: [0, 0],
        bytes: 0,
        class: 'double',
        global: true,
        sparse: false,
        complex: false,
        nesting: {
          function: '',
          level: 0,
        },
      },
      {
        key: 3,
        value: '',
        disp: 'MAP Image URl',
        label: 'gb_map_imgs',
        size: [0, 0],
        bytes: 0,
        class: 'double',
        global: true,
        sparse: false,
        complex: false,
        nesting: {
          function: '',
          level: 0,
        },
        persistent: false,
      },
      {
        key: 4,
        value: '',
        disp: 'Awaiting Loaded .mat File',
        label: 'gb_mat_file',
        size: [0, 0],
        bytes: 0,
        class: 'char',
        global: true,
        sparse: false,
        complex: false,
        nesting: {
          function: '',
          level: 0,
        },
        persistent: false,
      },
    ],
    imgBuffer: [
      {
        key: 0,
        label: 'mt_img_buffer',
        value: null,
        width: null,
        height: null,
      },
      {
        key: 1,
        label: 'map_img_buffer',
        value: null,
        width: null,
        height: null,
      },
    ],
    mulCanvasState: [
      {
        key: 0,
        label: 'if_drawing_line',
        value: false,
      },
      {
        key: 1,
        label: 'contrast',
        value: 5,
      },
      {
        key: 2,
        label: 'brightness',
        value: 1,
      },
      {
        key: 3,
        label: 'kymograph_num',
        value: 1,
      },
    ],
  },
  getters: {
    getGBByLabel: (state) => (label) => {
      return state.gb.find((gbVal) => gbVal.label === label);
    },
    getBufferByLabel: (state) => (label) => {
      return state.imgBuffer.find((buffer) => buffer.label === label);
    },
    getMulCanvasState: (state) => (label) => {
      return state.mulCanvasState.find((cState) => cState.label === label);
    },
  },
  mutations: {
    CHANGE_GB_NM_PER_PIXEL(state, payload) {
      let GB_NM_PER_PIXEL = state.gb.find(
        (gbVal) => gbVal.label === 'GB_NM_PER_PIXEL'
      );
      GB_NM_PER_PIXEL.value = payload;
    },
    CHANGE_GB_TIME_INTERVAL(state, payload) {
      let GB_TIME_INTERVAL = state.gb.find(
        (gbVal) => gbVal.label === 'GB_TIME_INTERVAL'
      );
      GB_TIME_INTERVAL.value = payload;
    },
    CHANGE_GB_MT_IMGS(state, payload) {
      let GB_MT_IMGS = state.gb.find((gbVal) => gbVal.label === 'gb_mt_imgs');
      GB_MT_IMGS.value = payload;
    },
    CHANGE_GB_MAP_IMGS(state, payload) {
      let GB_MAP_IMGS = state.gb.find((gbVal) => gbVal.label === 'gb_map_imgs');
      GB_MAP_IMGS.value = payload;
    },
    CHANGE_GB_MAT_FILE(state, payload) {
      let GB_MAT_FILE = state.gb.find((gbVal) => gbVal.label === 'gb_mat_file');
      GB_MAT_FILE.value = payload;
    },
    LOAD_MT_IMG_BUFFER(state, payload) {
      let MT_IMG_BUFFER = state.imgBuffer.find(
        (gbVal) => gbVal.label === 'mt_img_buffer'
      );
      MT_IMG_BUFFER.value = payload.rgba;
      MT_IMG_BUFFER.width = payload.width;
      MT_IMG_BUFFER.height = payload.height;
    },
    LOAD_MAP_IMG_BUFFER(state, payload) {
      let MAP_IMG_BUFFER = state.imgBuffer.find(
        (gbVal) => gbVal.label === 'map_img_buffer'
      );
      MAP_IMG_BUFFER.value = payload.rgba;
      MAP_IMG_BUFFER.width = payload.width;
      MAP_IMG_BUFFER.height = payload.height;
    },
    TOGGLE_MUL_CANVAS_STATE(state, payload) {
      let MUL_CANVAS_STATE = state.mulCanvasState.find(
        (mCanvas) => mCanvas.label === 'if_drawing_line'
      );
      MUL_CANVAS_STATE.value = payload;
    },
    CHANGE_CONTRAST(state, payload) {
      let CONTRAST = state.mulCanvasState.find(
        (mCanvas) => mCanvas.label === 'contrast'
      );
      CONTRAST.value = payload;
    },
    CHANGE_BRIGHTNESS(state, payload) {
      let BRIGHT = state.mulCanvasState.find(
        (mCanvas) => mCanvas.label === 'brightness'
      );
      BRIGHT.value = payload;
    },
    CHANGE_KYMOGRAPH_NUM(state, payload) {
      let KYMOGRAPH_NUM = state.mulCanvasState.find(
        (mCanvas) => mCanvas.label === 'kymograph_num'
      );
      KYMOGRAPH_NUM.value = payload;
    },
  },
});
