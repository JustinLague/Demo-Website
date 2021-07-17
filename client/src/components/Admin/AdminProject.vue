<template>
    <div class="content" v-if="project">
        <b-form @submit.prevent="handleSubmit">
            <h2 class="main-title"><clickToEdit :value="$t('project.title', project.title)" @input="updateTitle" class="section-text"></clickToEdit></h2>
            <h4 class="art-description"><clickToEdit :value="$t('project.artDescription', project.artDescription)" @input="updateArtDescription" class="section-text"></clickToEdit></h4>
            
            <div class="row">
                <div class="col-lg-11">
                    <h4 class="description"><clickToEdit :value="$t('project.description', project.description)" @input="updateDescription" class="section-text"></clickToEdit></h4>    
                </div>
            </div>
            
            <Image-viewer :images=project.images v-if="project.images"></Image-viewer>

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
</template>

<script>
import ImageViewer from "../subComponents/ImageViewer";
import clickToEdit from "./subComponents/ClickToEdit";
import AddImage from './subComponents/AddImage';
import { mapActions, mapState } from "vuex";

export default {
    components: {
        AddImage,
        clickToEdit,
        ImageViewer
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
        ...mapActions("dashboard", ["updateProject"]),
        initProject() {
            if (this.projectId)
                this.project = this.projects.find(project => project.id === this.projectId);
        },
        updateTitle(value) {
            if (this.$i18n.locale == "fr")
                this.project.title[0] = value;
            else   
                this.project.title[1] = value;
        },
        updateArtDescription(value) {
             if (this.$i18n.locale == "fr")
                this.project.artDescription[0] = value;
            else   
                this.project.artDescription[1] = value;
        },
        updateDescription(value) {
            if (this.$i18n.locale == "fr")
                this.project.description[0] = value;
            else   
                this.project.description[1] = value;
        },
        addImage(image) {
            this.project.images.push({ ...image});
        },
        handleSubmit() {
            this.updateProject({project: this.project, sectionId: this.sectionId});
        }
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
