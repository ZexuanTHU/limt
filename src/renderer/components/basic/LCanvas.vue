<template>
  <canvas id="canvas"
  v-on:mousedown="handleMouseDown"
  v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove"
  width="800px" height="800px">
  </canvas>
</template>

<script>
export default {
  data() {
    return {
      mouse: {
        current: {
          x: 0,
          y: 0,
        },
        previous: {
          x: 0,
          y: 0,
        },
        down: false,
      },
    };
  },
  computed: {
    currentMouse() {
      let c = document.getElementById('canvas');
      let rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top,
      };
    },
  },
  methods: {
    draw(event) {
      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        let c = document.getElementById('canvas');

        let ctx = c.getContext('2d');

        ctx.clearRect(0, 0, 800, 800);

        ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        ctx.strokeStyle = '#F63E02';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    },
    handleMouseDown(event) {
      let ifMouseDown = true;
      this.mouse.down = ifMouseDown;

      this.mouse.current = {
        x: event.pageX,
        y: event.pageY,
      };

      let c = document.getElementById('canvas');
      let ctx = c.getContext('2d');

      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
    },
    handleMouseUp() {
      this.mouse.down = false;
    },
    handleMouseMove(event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY,
      };

      this.draw(event);
    },
    ready() {
      let c = document.getElementById('canvas');
      let ctx = c.getContext('2d');
      ctx.translate(0.5, 0.5);
      ctx.imageSmoothingEnabled = false;
    },
  },
};
</script>
