<template>
  <div class="container">
    <color-picker class="color-picker"></color-picker>
    <eraser class="icon eraser"></eraser>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker/ColorPicker";
import Eraser from "./Eraser";

export default {
  components: {
    ColorPicker,
    Eraser
  }
};
</script>

<style scoped>
.containter {
  position: relative;
}

.icon {
  font-size: 34px;
}
</style>
