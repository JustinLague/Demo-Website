<template>
  <div id="app">
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>

<style>
body {
  margin: 0px;
}
</style>
