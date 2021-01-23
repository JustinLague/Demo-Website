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
                <b-dropdown id="projectId" v-model="projectId" text="Select Item" variant="primary" class="m-md-2" v-on:change="changeItem">
                    <b-dropdown-item v-for="project in projects" :key="project.id" :value="project.title[0]" @click="projectId = option.value"></b-dropdown-item>           
                </b-dropdown> 
            </b-form-group>

            <b-form-group>
                <AddImageModal v-on:addImage="addImage"></AddImageModal>
                <b-button variant="primary" @click="$modal.show('modal-add-image')">Ajouter une image</b-button>
            </b-form-group>

            <b-form-group>
                <div>
                    <img :src=image.urlImage>
                </div>
            </b-form-group>

            <b-form-group>
                <div v-if="!portfolioTryingToUpload">
                    <b-button type="submit" variant="primary">Ajouter un portfolio</b-button>
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

export default {
  components: {
    AddImageModal,
  },
    data() {
        return {
            projects: [],
            portfolio: {
                portfolioTitle: [],
                portfolioDescription: [],
                projectId: Number
            },
            image: {},
        };
    },
    computed: {
        ...mapState("dashboard"),
        console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["addPortfolio"]),
        handleSubmit() {
            const { portfolio, image } = this;

            this.addPortfolio({ portfolio, image });
        },
        addImage(image) {
            this.image = { ...image};
        },
    },
}
</script>

<style scoped>


</style>
