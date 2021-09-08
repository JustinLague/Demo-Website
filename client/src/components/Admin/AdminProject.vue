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
                                        @input="onUpdateValue" 
                                        class="section-text"
                                        :edit=editTitle></clickToEdit>
                            <div class="edit-icon-border" @click="editTitle=true">
                                <b-icon class="icon edit-icon" id="icon-env" scale="0.7" icon="pencil-fill" @click="editTitle=true"></b-icon>
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
                                        @input="onUpdateValue" 
                                        class="section-text"
                                        :edit=editArtDescription></clickToEdit>
                            <div class="edit-icon-border" @click="editArtDescription=true">
                                <b-icon class="icon edit-icon" id="icon-env" scale="0.7" icon="pencil-fill" @click="editArtDescription=true"></b-icon>
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
                                        @input="onUpdateValue" 
                                        class="section-text"
                                        :edit=editDescription></clickToEdit>
                            <div class="edit-icon-border" @click="editDescription=true">
                                <b-icon class="icon edit-icon" id="icon-env" scale="0.7" icon="pencil-fill" @click="editDescription=true"></b-icon>
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
                
                <b-button v-b-modal.modal-add-images variant="primary">Ajouter une image</b-button>
                
                <b-form-group>
                    <div v-if="!projectTryingToAdd" class="float-right">
                        <b-button type="submit" variant="success">Retour au portfolio</b-button>
                    </div>
                    <div v-else>
                        <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
                    </div>
                </b-form-group>
            </b-form>

            <!-- Modal -->
            <add-images @addImage="onAddImage"></add-images>
        </div>
    </div>
</div>
</template>

<script>
import EnlargeableImage from "@diracleo/vue-enlargeable-image";
import clickToEdit from "./subComponents/ClickToEdit";
import AddImages from './subComponents/AddImages';
import { mapActions, mapState, mapGetters } from "vuex";

export default {
    components: {
        AddImages,
        clickToEdit,
        EnlargeableImage
    },
    props: {
        sectionId: String,
        projectId: String
    },
    data () {
        return {
            editTitle: false,
            editDescription: false,
            editArtDescription: false,
        }
    },
     created() {
        this.$nextTick(function () {
			this.stayRemove();
            this.createImageFromLocalStorage({ projectId: this.projectId });
		})
	},
    computed: {
        ...mapState("project", ["projectTryingToAdd"]),
        ...mapGetters("project", ["getProject"]),
        project() {
            return this.getProject(this.projectId);
        },
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("project", ["updateValue", "deleteImage", "addImage", "initProject", "createImageFromLocalStorage"]),
        ...mapActions("dashboard", ["addProjectToSection", "stayRemove"]),
        onUpdateValue(value, prop) {
            this.editTitle = false;
            this.editDescription = false;
            this.editArtDescription = false;
            
            this.updateValue({projectId: this.projectId, value, prop, lang: this.$i18n.locale});
        }, 
        onAddImage(image) {
            this.addImage({ image: {...image}, projectId: this.projectId})
        },
        handleSubmit() {
            this.addProjectToSection({ projectId: this.projectId, sectionId: this.sectionId });
            this.$router.push({name: 'AdminPortfolio'});
        },
        onDeleteImage(image) {
            this.deleteImage({ image: {...image}, projectId: this.projectId});
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
