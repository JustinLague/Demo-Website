<template>
  <div>
    <nav class="navbar navbar-default" v-if="show">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/Sketcher">Sketcher</router-link>
        </div>
        <ul class="nav navbar-nav">
          <li v-on:click="logout"><router-link class="navbar-brand" to="/">Déconnection</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NavBar",
  methods: {
    ...mapActions("user", ["logout"])
  },
  computed: {
    show() {
      return this.$route.name !== "Login";
    }
  }
};
</script>

<style scoped></style>
