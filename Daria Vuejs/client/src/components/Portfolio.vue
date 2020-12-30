<template>
  <div class="content">
    <h1 class="first">Portfolio</h1>

    <PortfolioViewer :portfolios="portfolios" v-if="portfolios"></PortfolioViewer>
  </div>
</template>

<script>
import PortfolioViewer from "./subComponents/PortfolioViewer";
import { mapActions, mapState } from "vuex";

export default {
    components: {
        PortfolioViewer
    },
    created() {
        this.$nextTick(function () {
            this.initPortfolio();
    })},
    computed: {
        ...mapState("portfolio", ["portfolios"]),
    },
    methods: {
        ...mapActions("portfolio", ["initPortfolio"]),
    }
}
</script>

<style scoped>
.first {
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
}
</style>