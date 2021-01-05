<template>
  <div>
      Dashboard
      {{ nbImages }}
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    created() {
        this.$nextTick(function () {
            this.initDashboard();
    })},
    computed: {
        ...mapState("dashboard", ["nbImages"]),
    },
    methods: {
        ...mapActions("dashboard", ["initDashboard"]),
    }
}
</script>

<style>

</style>