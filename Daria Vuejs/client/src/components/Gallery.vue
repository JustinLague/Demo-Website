<template>
    <div class="content">
        <h2 class="main-title">{{ $t('gallery.title') }}</h2>

        <div v-if="galleryImages">
            <div v-for="galleryImage in formatedArray" :key="galleryImage.length">
                <div class="row">
                    <div class="col-lg-4" v-for="image in galleryImage" :key="image.id">
                        <div class="image">
                            <enlargeable-image :src=image.thumnailUrl :src_large=image.detailedImageUrl />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EnlargeableImage from "@diracleo/vue-enlargeable-image";
import { mapActions, mapState } from "vuex";

export default {
    components: {
        EnlargeableImage
    },
    created() {
        this.$nextTick(function () {
          this.initGallery();
    })},
    computed: {
        ...mapState("gallery", ["galleryImages"]),
        formatedArray() {
            const result = []
            for (let i = 0; i < this.galleryImages.length; i += 3)
                result.push(this.galleryImages.slice(i, i + 3))
            return result
        }
    },
    methods: {
        ...mapActions("gallery", ["initGallery"]),
    }

}
</script>

<style scoped>
.name {
    margin-top: 18px;
}

a {
    color: black; 
    text-decoration: none;
}

a:hover {
    color: #808080;
    text-decoration: none;
}

.image {
    margin-bottom: 30px;
}
</style>