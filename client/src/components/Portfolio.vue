<template>
    <div class="content">
        <h2 class="main-title">{{ $t('portfolio.title') }}</h2>
        <div class="section" v-for="section in sections" :key="section._id">
            <h5 class="sub-section">{{ $t('portfolio.sectionTitle', section.title) }}</h5>
            <div v-if="section.metaProjects">
                <div class="row">
                    <div class="col-lg-12 project" v-for="p in section.metaProjects" :key="p.index">
                        <router-link :to="{name: 'Project', params: { projectId: p.project._id }}">
                            <p>
                                {{ $t('project.title', p.project.title) }}
                            </p>
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
    })},
    computed: {
        ...mapState("portfolio", ["sections"]),
    },
    methods: {
        ...mapActions("portfolio", ["initSections"]),
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