<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-12 content">
            <b-form @submit.prevent="handleSubmit">
                <div class="row">
                    <div class="col-md-12 section-main-title">
                        <h2 class="main-title">
                            <clickToEdit :value="$t('project.title', project.title)" 
                                        :prop="'title'"
                                        @input="updateValue" 
                                        class="section-text"></clickToEdit>
                            <div class="edit-icon-border">
                                <b-icon class="icon edit-icon" id="icon-env" scale="0.7" icon="pencil-fill"></b-icon>
                            </div>
                        </h2>
                    </div>
                </div>
                
                <div class="row section-art-description">
                    <div class="col-md-12">
                        <h4 class="art-description">
                            <clickToEdit :value="$t('project.artDescription', project.artDescription)" 
                                        :prop="'artDescription'"
                                        :textarea="true"
                                        @input="updateValue" 
                                        class="section-text"></clickToEdit>
                            <div class="edit-icon-border">
                                <b-icon class="icon edit-icon" id="icon-env" scale="0.7" icon="pencil-fill"></b-icon>
                            </div>
                        </h4>
                    </div>
                </div>
                
                <div class="row section-description">
                    <div class="col-md-12">
                        <h4 class="description">
                            <clickToEdit :value="$t('project.description', project.description)" 
                                        :prop="'description'"
                                        :textarea="true"
                                        @input="updateValue" 
                                        class="section-text"></clickToEdit>
                            <div class="edit-icon-border">
                                <b-icon class="icon edit-icon" id="icon-env" scale="0.7" icon="pencil-fill"></b-icon>
                            </div>
                        </h4>    
                    </div>
                </div>

                <div v-if="project.images">
                    <div class="row">
                        <div class="col-lg-6 images" v-for="image in project.images" :key="image.length">
                            <div class="image-container">
                                <enlargeable-image class="image" :src=image.detailedImageUrl :src_large=image.detailedImageUrl />
                                <b-icon class="delete-icon" icon="x-circle-fill" font-scale="2" @click="onDeleteImage(image)"></b-icon>
                            </div>
                        </div>
                    </div>
                </div>
                
                <b-button v-b-modal.modal-add-image variant="primary">Ajouter une image</b-button>
                
                <b-form-group>
                    <div v-if="!projectTryingToAdd" class="float-right">
                        <b-button type="submit" variant="success">Sauvegarder</b-button>
                    </div>
                    <div v-else>
                        <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
                    </div>
                </b-form-group>
            </b-form>

            <!-- Modal -->
            <add-image @addImage="addImage"></add-image>
        </div>
    </div>
</div>
</template>

<script>
import EnlargeableImage from "@diracleo/vue-enlargeable-image";
import clickToEdit from "./subComponents/ClickToEdit";
import AddImage from './subComponents/AddImage';
import { mapActions, mapState } from "vuex";

export default {
    components: {
        AddImage,
        clickToEdit,
        EnlargeableImage
    },
    props: {
        sectionId: String,
        projectId: String
    },
    data() {
        return {
            project: {
                title: ["Sans titre", "No title"],
                artDescription: ["description de l'art", "art description"],
                description: ["description du project", "project description"],
                images: []
            },
           
        }
    },
    created() {
        this.$nextTick(function () {
            this.initProject();
        })
    },
    computed: {
        ...mapState("dashboard", ["projectTryingToAdd", "projects"]),
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["updateProject", "deleteImage"]),
        initProject() {
            if (this.projectId)
                this.project = this.projects.find(project => project.id === this.projectId);
        },
        updateValue(value, prop) {
            switch(this.$i18n.locale) {
                case("fr"):
                    this.project[prop][0] = value;
                    break;
                case("en"):
                    this.project[prop][1] = value;
                    break;
            }
        }, 
        addImage(image) {
            this.project.images.push({ ...image});
        },
        handleSubmit() {
            this.updateProject({project: this.project, sectionId: this.sectionId});
        },
        onDeleteImage(image) {
            this.deleteImage(image);
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
    color: #808080;
    text-decoration: none;
}

.edit-icon-border {
    border: 1px solid rgb(28 103 206);
    border-radius: 6px;
    color: rgb(28 103 206);
    padding-left: 3px;
    padding-right: 3px; 
    margin-right: 8px;
    display: inline;
    float: right;
}

.edit-icon-border:hover {
    cursor: pointer;
    background-color: rgb(28 103 206);
}

.edit-icon-border:hover > .icon{
    cursor: pointer;
    color: white;
}

.section-art-description {
    padding-bottom: 20px;
    margin-bottom: 6px;
}

.section-description {
    padding-bottom: 20px;
    margin-bottom: 6px;
}

.section-text {
    display: inline;
}

.art-description {
    font-size: 1.15em;  
    font-weight: 300;
    color: #808080;
    display: inline;
}

.description {
    text-align: justify;
    font-size: 1.25em;
    font-weight: 200;
    display: inline;
}

.images {
    margin-bottom: 30px;
}

.image-container {
    position: relative;
}

.delete-icon {
    position: absolute;
    top: -15px;
    right: -15px;
    cursor: pointer;
}
</style>
