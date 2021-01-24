<template>
    <div class="content" v-if="project">
        <h2 class="main-title">{{ $t('project.title', project.title) }}</h2>
        <h4 class="art-description">{{ $t('project.artDescription', project.artDescription) }}</h4>
        
        <div class="row">
            <div class="col-lg-6">
                <h4 class="description">{{ $t('project.description', project.description) }}</h4>    
            </div>
        </div>
        <Image-viewer :images=images v-if="images"></Image-viewer>
    </div>
</template>

<script>
import ImageViewer from "./SubComponents/ImageViewer";
import { mapActions, mapState } from "vuex";

export default {
    components: {
        ImageViewer
    },
    props: ["projectId"],
    created() {
        this.$nextTick(function () {
            this.initProject(this.projectId);
    })},
    computed: {
        ...mapState("project", ["project", "images"]),
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