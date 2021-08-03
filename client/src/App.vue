<template>
  <div id="app">

      <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">

    <div class="container-fluid" v-if=show>
      <div class="row">
        <div class="col-lg-2">
          <Menu :is-dashboard=showDashboardMenu></Menu>
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
      return !(this.$route.name === "Login");
    },
    showDashboardMenu() {
      return (this.$route.name === "Dashboard" || 
               this.$route.name.includes("Admin"));
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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

div.full.enlarged {
    background-image: none !important;
}

</style>
