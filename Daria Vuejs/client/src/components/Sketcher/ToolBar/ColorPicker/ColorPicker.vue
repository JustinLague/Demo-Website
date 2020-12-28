<template>
  <div>
    <div
      class="display main-color"
      :style="{ backgroundColor: mainColorRGB }"
      v-on:click="toggleColorMainPicker"
      v-on-clickaway="closeColorMainPicker"
    >
      <span class="toggle-color-picker">
        <font-awesome-icon icon="palette" />
      </span>
      <color-picker-pop-up
        class="chrome-picker main-picker"
        :color="mainColor"
        :showColorPicker="showColorMainPicker"
      />
    </div>
    <div
      class="display secondairy-color"
      :style="{ backgroundColor: secondaryColorRGB }"
      v-on:click="toggleColorSecondary"
      v-on-clickaway="closeColorSecondaryPicker"
    >
      <span class="toggle-color-picker">
        <font-awesome-icon icon="palette" />
      </span>
      <color-picker-pop-up
        class="chrome-picker secondairy-picker"
        :color="secondaryColor"
        :showColorPicker="showColorSecondaryPicker"
      />
    </div>
  </div>
</template>

<script>
import ColorPickerPopUp from "./ColorPickerPopUp";
import { mixin as clickaway } from "vue-clickaway";
import { mapGetters, mapActions } from "vuex";

export default {
  mixins: [clickaway],
  components: {
    ColorPickerPopUp
  },
  data() {
    return {
      showColorMainPicker: false,
      showColorSecondaryPicker: false
    };
  },
  computed: {
    ...mapGetters("sketcher", ["mainColor", "mainColorRGB", "secondaryColor", "secondaryColorRGB"])
  },
  methods: {
    ...mapActions("sketcher", ["canDraw"]),
    toggleColorMainPicker() {
      this.showColorMainPicker = true;
      this.updateCanDraw();
    },
    toggleColorSecondary() {
      this.showColorSecondaryPicker = true;
      this.updateCanDraw();
    },
    closeColorMainPicker() {
      this.showColorMainPicker = false;
      this.updateCanDraw();
    },
    closeColorSecondaryPicker() {
      this.showColorSecondaryPicker = false;
      this.updateCanDraw();
    },
    updateCanDraw() {
      //!XOR
      this.canDraw(
        !(
          (!this.showColorMainPicker && this.showColorSecondaryPicker) ||
          (this.showColorMainPicker && !this.showColorSecondaryPicker)
        )
      );
    }
  }
};
</script>

<style scoped>
.main-color {
  position: relative;
}

.main-picker {
  position: absolute;
  top: 25px;
  left: 50px;
}

.secondairy-color {
  position: relative;
}

.secondairy-picker {
  position: absolute;
  top: 25px;
  left: 50px;
}

.display {
  width: 50px;
  height: 50px;
  margin: 0px 0px 10px 0px;
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
}

.toggle-color-picker {
  position: absolute;
  font-size: 15px;
  color: grey;
  top: 10px;
  left: 15px;
}
</style>
