<template>
  <vue-p5 @setup="setup" @draw="draw" @mouseclicked="mouseClicked"></vue-p5>
</template>
<script>
import { mapState } from "vuex";
import VueP5 from "vue-p5";
import { Drawing } from "./Drawing";

export default {
  components: {
    VueP5
  },
  data() {
    return {
      drawing: new Drawing(),
      isDrawing: false,
      fps: 0
    };
  },
  computed: {
    ...mapState("sketcher", ["colors", "canDraw"])
  },
  methods: {
    setup(sk) {
      this.drawing.setup(sk);
    },
    draw(sk) {
      this.drawing.draw(sk, this.colors, this.canDraw);
    },
    mouseClicked(sk) {
      if (this.canDraw) this.drawing.mouseClicked(sk, this.colors);
    }
  }
};
</script>

<style></style>
