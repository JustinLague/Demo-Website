<template>
    <b-container class="form-container">
        <h2 class="main-title">Ajouter un nouveau projet</h2>
        <b-form @submit.prevent="handleSubmit">
            <b-form-group>
                <div class="row">
                    <div class="col-lg-6">
                        <h6>Français</h6>
                        <b-input placeholder="Titre du projet" v-model="project.projectTitle[0]"></b-input>
                    </div>
                    <div class="col-lg-6">
                        <h6>Anglais</h6>
                        <b-input placeholder="Titre du projet" v-model="project.projectTitle[1]"></b-input>
                    </div>
                </div>
            </b-form-group>

            <b-form-group>
                <div class="row">
                    <div class="col-lg-6">
                        <textarea placeholder="Description de l'art" class="form-control" v-model="project.projectArtDescription[0]" rows="3"></textarea>
                    </div>
                    <div class="col-lg-6">
                        <textarea placeholder="Description de l'art" class="form-control" v-model="project.projectArtDescription[1]" rows="3"></textarea>
                    </div>
                </div>
            </b-form-group>

            <b-form-group>
                <div class="row">
                    <div class="col-lg-6">
                        <textarea placeholder="Description du projet" class="form-control" v-model="project.projectDescription[0]" rows="3"></textarea>
                    </div>
                    <div class="col-lg-6">
                        <textarea placeholder="Description du projet" class="form-control" v-model="project.projectDescription[1]" rows="3"></textarea>
                    </div>
                </div>
            </b-form-group>

            <b-form-group>
                <AddImageModal v-on:addImage="addImage"></AddImageModal>
                <b-button variant="primary" @click="$modal.show('modal-add-image')">Ajouter une image</b-button>
            </b-form-group>

            <b-form-group>
                <div v-for="image in images" :key="image.name">
                    <enlargeable-image :src=image.urlImage :src_large=image.urlThumbnail />
                </div>
            </b-form-group>

            <b-form-group>
                <div v-if="!projectTryingToUpload">
                    <b-button type="submit" variant="primary">Ajouter un projet</b-button>
                </div>
                <div v-else>
                    <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
                </div>
            </b-form-group>

            <b-form-group>
                <label class="error" :state="hasError">
                    {{ serverError }}
                </label>
            </b-form-group>
        </b-form>
    </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddImageModal from "./AddImageModal";
import EnlargeableImage from "@diracleo/vue-enlargeable-image";

export default {
  components: {
    AddImageModal,
    EnlargeableImage
  },
    data() {
        return {
            project: {
                projectTitle: [],
                projectArtDescription: [],
                projectDescription: [],
            },
            images: [],
        };
    },
    computed: {
        ...mapState("dashboard", ["projectTryingToUpload", "serverError"]),
        hasError() {
            return !this.serverError;
        },
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["addProject"]),
        handleSubmit() {
            const { projectTitle, projectArtDescription, projectDescription, images } = this;

            this.addProject({ projectTitle, projectArtDescription, projectDescription, images });
        },
        addImage(image) {
            this.images.push({ ...image});
        },
    },
}
</script>

<style scoped>


</style>
