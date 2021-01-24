<template>
    <b-container class="form-container">
        <h2 class="main-title">Ajouter un nouveau portfolio</h2>
        <b-form @submit.prevent="handleSubmit">
            <b-form-group>
                <div class="row">
                    <div class="col-lg-6">
                        <h6>Français</h6>
                        <b-input placeholder="Titre du portfolio" v-model="portfolio.portfolioTitle[0]"></b-input>
                    </div>
                    <div class="col-lg-6">
                        <h6>Anglais</h6>
                        <b-input placeholder="Titre du portfolio" v-model="portfolio.portfolioTitle[1]"></b-input>
                    </div>
                </div>
            </b-form-group>

            <b-form-group>
                <div class="row">
                    <div class="col-lg-6">
                        <textarea placeholder="Description du portfolio" class="form-control" v-model="portfolio.portfolioDescription[0]" rows="3"></textarea>
                    </div>
                    <div class="col-lg-6">
                        <textarea placeholder="Description du portfolio" class="form-control" v-model="portfolio.portfolioDescription[1]" rows="3"></textarea>
                    </div>
                </div>
            </b-form-group>

            <b-form-group>
                <b-dropdown v-model="portfolio.projectId" :text=getText() classplaceholder="Sélectionner une projet" variant="primary">
                    <b-dropdown-item v-for="project in projects" :key="project.id" :value="project.id" @click="portfolio.projectId = project.id; selectedProjectTitle = project.title[0]">{{project.title[0]}}</b-dropdown-item>           
                </b-dropdown> 
            </b-form-group>

            <b-form-group>
                <AddImageModal v-on:addImage="addImage" :isProject="false"></AddImageModal>
                <b-button variant="primary" @click="$modal.show('modal-add-image')">Ajouter une image</b-button>
            </b-form-group>

            <b-form-group>
                <div>
                    <img :src=portfolio.image.urlImage>
                </div>
            </b-form-group>

            <b-form-group>
                <div v-if="!portfolioTryingToAdd">
                    <b-button type="submit" variant="primary">Ajouter un portfolio</b-button>
                </div>
                <div v-else>
                    <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
                </div>
            </b-form-group>
        </b-form>
    </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddImageModal from "./AddImageModal";

export default {
    components: {
        AddImageModal,
    },
    data() {
        return {
            portfolio: {
                portfolioTitle: [],
                portfolioDescription: [],
                projectId: String,
                image: {},
            },
            selectedProjectTitle: String,
        };
    },
    created() {
        this.$nextTick(function () {
            this.getProjects();
        })
    },
    computed: {
        ...mapState("dashboard", ["projects", "portfolioTryingToAdd"]),
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["addPortfolio", "getProjects"]),
        handleSubmit() {
            const { portfolio } = this;

            this.addPortfolio( portfolio );
        },
        addImage(image) {
            this.portfolio.image = { ...image};
        },
        getText() {
            return this.selectedProjectTitle.length != 1 ? this.selectedProjectTitle : "Sélectionner un projet";
        }
    },
}
</script>

<style scoped>


</style>
