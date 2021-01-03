<template>
  <div id="app">
    <div class="container-fluid" v-if=show>
      <div class="row">
        <div class="col-lg-2">
          <Menu></Menu>
        </div>
        <div class="col-lg-10">
            <router-view></router-view>
        </div>
      </div>
    </div>
    <router-view v-if=!show></router-view>
  </div>
</template>

<script>
import Menu from "./components/Menu/Menu";

export default {
  name: "app",
  components: {
    Menu
  },
  computed: {
    show() {
      return !(this.$route.name === "Login" || 
               this.$route.name === "Dashboard");
    }
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

.main-title {
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
}

</style>
