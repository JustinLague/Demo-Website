<template>
  <div class="content">
        <h2 class="main-title">{{ $t('gallery.title') }}</h2>
        <div v-if="galleryImages">
			<dnd-zone
				:transition-duration="0.3"
				@move="move"
			>
				<dnd-container
					:dnd-model="formatedArray"
					dnd-id="grid-example"
					class="row"
					dense
				>
					<dnd-item
						v-for="image in formatedArray"
						:key="image._id"
						:dnd-id="image._id"
						:dnd-model="image"
					>
						<div class="col-lg-4">
							<div class="image">
								<img :src="image.thumnailUrl"/>
							</div>
						</div>
					</dnd-item>
				</dnd-container>
			</dnd-zone>
        </div>

		<div class="row">
			<div class="col align-self-end">
				<b-form @submit.prevent="handleSubmit">
				<b-form-group class="float-right">
						<div v-if="!saving">
							<b-button type="submit" variant="success">Sauvegarder</b-button>
						</div>
						<div v-else>
							<b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
						</div>
				</b-form-group>
				</b-form>
			</div>
		</div>
    </div>
</template>

<script>
// import EnlargeableImage from "@diracleo/vue-enlargeable-image";
import { mapActions, mapState } from "vuex";

export default {
	components: {
		// EnlargeableImage,
	},
    created() {
        this.$nextTick(function () {
			this.initGallery();
		})
	},
    computed: {
        ...mapState("dashboard", ["galleryImages", "saving", "serverError"]),
        formatedArray() {
			return [... this.galleryImages];
        },
		console: () => console,
        window: () => window,
    },
    methods: {
        ...mapActions("dashboard", ["initGallery", "moveImage", "updateIndex"]),
		move(evt) {
			this.moveImage({prevIndex: evt.from.index, newIndex: evt.to.index})
		},
		handleSubmit() {
			this.updateIndex();
		}
    }
}
</script>

<style>

</style>