<template>
    <div class="content">
        <h2 class="main-title">{{ $t('portfolio.title') }}</h2>
        <h5 class="sub-section">{{ $t('portfolio.painting') }}</h5>
        <div v-if="projects">
            <div class="row">
                <div class="col-lg-12 project" v-for="project in projects" :key="project.id">
                    <router-link :to="{name: 'Project', params: { projectId: project.id }}">
                        <p>
                            {{ $t('project.title', project.title) }}
                        </p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    created() {
        this.$nextTick(function () {
            this.initPortfolio();
    })},
    computed: {
        ...mapState("portfolio", ["projects"]),
    },
    methods: {
        ...mapActions("portfolio", ["initPortfolio"]),
    }
}
</script>

<style scoped>
a {
    color: black; 
    text-decoration: none;
}

a:hover {
    color: #808080;
    text-decoration: none;
}

.project {
    margin-bottom: -10px;
}

.sub-section {
    padding-top: 30px;
    padding-bottom: 10px;
}
</style>