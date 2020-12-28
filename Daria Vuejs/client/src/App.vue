<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2">
          <Menu></Menu>
        </div>
        <div class="col-lg-10">
            <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu";

export default {
  name: "app",
  components: {
    Menu
  }
};
</script>

<style>
body {
  margin: 0px;
}

.content {
    padding-top: 85px;
}

img {
    width: 100%;
}
</style>
