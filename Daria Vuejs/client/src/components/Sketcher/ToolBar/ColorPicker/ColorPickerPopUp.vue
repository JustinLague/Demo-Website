<template>
  <div v-if="showColorPicker">
    <sketch-picker @input="updateColor" :value="activeColor"></sketch-picker>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { Sketch } from "vue-color";

export default {
  name: "ColorPickerPopUp",
  components: {
    "sketch-picker": Sketch
  },
  props: {
    color: Object,
    showColorPicker: Boolean
  },
  data() {
    let keyColor = Object.keys(this.color)[0];
    return {
      keyColor: keyColor,
      activeColor: this.color[keyColor]
    };
  },
  methods: {
    updateColor(color) {
      this.color[this.keyColor].rgba = color.rgba;
      this.$store.dispatch("sketcher/updateColor", this.color);
    }
  }
};
</script>

<style scoped></style>
