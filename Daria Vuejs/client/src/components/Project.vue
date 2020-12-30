<template>
    <div class="content">
        <h1 class="title">{{ title }}</h1>
        <h4 class="art-description">{{ artDescription }}</h4>
        
        <div class="row">
            <div class="col-lg-6">
                <h4 class="description">{{ description }}</h4>    
            </div>
        </div>
            
        <!-- <Image-viewer :image=images[0] v-if="images[0]"></Image-viewer> -->

        <div v-for="image in images" :key="image">
            <Image-viewer :image=image v-if="image"></Image-viewer>
        </div>
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
        this.$nextTick(function () {
            this.initProject(this.projectId);
    })},
    computed: {
        ...mapState("project", ["title", "artDescription", "description", "images"]),
    },
    methods: {
        ...mapActions("project", ["initProject"]),
    }
}
</script>

<style scoped>
.title {
    font-weight: 400;
}

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