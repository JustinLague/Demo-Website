<template>
  <div class="content" v-if="loaded">
    <h2 class="main-title">{{ $t('about.title') }}</h2>

    <div class="row">
        <div class="col-lg-4 profil">
            <img :src="about.imageURL">
            <b-button v-b-modal.modal-add-image variant="primary">{{ $t('about.changeImage') }}</b-button>
        </div>

        <div class="col-lg-6 col-12">
            <clickToEdit :value="$t('about.description', about.description)" 
                        :textarea="true"
                        @input="onUpdateDescription" 
                        :rows="25"
                        class="description"
                        :enterDoesNothing="true"
                        :edit=edit></clickToEdit>

            <div v-if="!saving" class="float-right">
                <b-button type="submit" variant="success">{{ $t('admin.save') }}</b-button>
            </div>
            <div v-else>
                <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <add-image @addImage="onUpdateImage"></add-image>
    <confirm-dialogue-simple ref="confirmDialogueSimple"></confirm-dialogue-simple>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddImage from './subComponents/AddImage';
import clickToEdit from "./subComponents/ClickToEdit";
import ConfirmDialogueSimple from './subComponents/ConfirmDialogueSimple'


export default {
     components: {
        AddImage,
        clickToEdit,
        ConfirmDialogueSimple
    },
    created() {
        this.$nextTick(function () {
			this.initAbout();
		})
	},
    data() {
        return { 
            edit: false
        }
    },
    computed: {
        ...mapState("about", ["about", "serverError", "loaded", "saving"]),
		console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("about", ["initAbout", "updateDescription", "updateImage", "saveAbout"]),
		async handleSubmit() {
              const ok = await this.$refs.confirmDialogueSimple.show({
                title: 'Confirmation',
                message: "N'oublie pas la description anglaise !",
                okButton: 'Sauvegarder',
            })

            if (ok) {
                this.saveAbout();
            } 
		},
        onUpdateDescription(value) {
            this.updateDescription({value, lang: this.$i18n.locale})
        },
        onUpdateImage(image) {
            this.updateImage({ image: {...image}});
        },
    }
}
</script>

<style scoped>
.description { 
    text-align: justify;
    text-justify: inter-word;
}

.profil {
    margin-bottom: 30px;
}

img {
    margin-bottom: 20px;
}
</style>