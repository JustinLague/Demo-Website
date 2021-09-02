<template>
<div class="content" v-if="loaded">
    <h2 class="main-title">{{ $t('about.title') }}</h2>

    <div class="row">
        <div class="col-lg-4 profil">
            <img :src="about.imageURL">
        </div>

        <div class="col-lg-6 col-12">
            <p v-html="$t('about.description', about.description)"></p>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    created() {
        this.$nextTick(function () {
          this.initAbout();
    })},
    computed: {
        ...mapState("about", ["about", "loaded"]),
    },
    methods: {
        ...mapActions("about", ["initAbout"]),
    }
}
</script>

<style scoped>
p { 
    text-align: justify;
    text-justify: inter-word;
}

.profil {
    margin-bottom: 30px;
}
</style>