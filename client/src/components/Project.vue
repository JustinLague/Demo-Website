<template>
    <div class="content" v-if="loaded">
        <h2 class="main-title" v-html="$t('project.title', project.title)"></h2>
        <h4 class="art-description" v-html="$t('project.artDescription', project.artDescription)"></h4>
        
        <div class="row">
            <div class="col-lg-11">
                <h4 class="description" v-html="$t('project.description', project.description)"></h4>    
            </div>
        </div>
        <Image-viewer :images=project.images v-if="project.images"></Image-viewer>
    </div>
</template>

<script>
import ImageViewer from "./subComponents/ImageViewer";
import { mapActions, mapState } from "vuex";

export default {
    components: {
        ImageViewer
    },
    props: ["projectId"],
    created() {
        this.$nextTick(() => {
            this.initProject(this.projectId);
        })
    },
    computed: {
        ...mapState("project", ["project", "loaded"]),
    },
    methods: {
        ...mapActions("project", ["initProject"]),
    }
}
</script>

<style scoped>
.art-description {
    font-size: 1.15em;  
    font-weight: 300;
    color: #808080;
    padding-bottom: 20px;
}

.description {
    text-align: justify;
    font-size: 1.25em;
    font-weight: 200;
    padding-bottom: 20px;
}

a {
    color: black; 
    text-decoration: none;
}

a:hover {
    color: #808080;
    text-decoration: none;
}
</style>
