<template>
    <div class="content">
        <h2 class="main-title">{{ $t('portfolio.title') }}</h2>
        <div class="section" v-for="section in sections" :key="section._id">
            <h5 class="sub-section" v-html="$t('portfolio.sectionTitle', section.title)"></h5>
            <div v-if="section.metaProjects">
                <div class="row">
                    <div class="col-lg-12 project" v-for="metaProject in section.metaProjects" :key="metaProject.index">
                        <router-link :to="{name: 'Project', params: { projectId: metaProject.projectId }}">
                            <p v-html="$t('project.title', getProject(metaProject.projectId).title)"></p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, } from "vuex";

export default {
    created() {
        this.$nextTick(function () {
            this.initSections();
            this.initProjects();
    })},
    computed: {
        ...mapState("portfolio", ["sections"]),
        ...mapState("project", ["projects"]),
    },
    methods: {
        ...mapActions("project", ["initProjects"]),
        ...mapActions("portfolio", ["initSections"]),
        getProject(projectId) {
            return this.projects.find(project => project._id === projectId);
        }
    }
}
</script>

<style scoped>
a {
    color: black; 
    text-decoration: none;
}

a:hover {
    color: #B5111B;
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