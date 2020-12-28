<template>
  <div class="sketcher" @contextmenu.prevent>
    <toolBar class="tool-bar print"></toolBar>
    <main-grid class="main-grid" />
  </div>
</template>

<script>
import MainGrid from "./MainGrid";
import ToolBar from "./ToolBar/ToolBar";

export default {
  name: "Sketcher",
  components: {
    ToolBar,
    MainGrid
  }
};
</script>

<style>
.sketcher {
  display: flex;
  flex-flow: row nowrap;
}

.tool-bar {
  order: 1;
  flex: 1 100%;
  padding: 10px;
}

.main-grid {
  order: 2;
  flex: 1 100%;
}

@media print {
  body {
    margin-top: 10px;
    transform: rotate(90deg);
  }
  .print {
    display: none;
  }
}
</style>
