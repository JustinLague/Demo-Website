<template>
    <div class="content">
        <h2 class="main-title">{{ $t('gallery.title') }}</h2>

        <div v-if="galleryImages">
            <div v-for="(galleryImage, index) in formatedArray" :key="index">
                <div class="row">
                    <div class="col-lg-4" v-for="image in galleryImage" :key="image.id">
                        <div class="image">
                            <b-icon class="icon" scale="4" icon="zoom-in"></b-icon>
                            <enlargeable-image :src=image.thumnailUrl :src_large=image.detailedImageUrl />
                            <router-link :to="{name: 'Project', params: { projectId: image.projectId }}">
                                <div class="background">
                                    <p class="more">{{ $t('gallery.more') }}</p>
                                </div>
                            </router-link>
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

<style>
a {
    color: black; 
    text-decoration: none;
}

a:hover {
    color: #808080;
    text-decoration: none;
}

.image {
    position: relative;
    margin-bottom: 30px;
}

.more {
    position: absolute;
    bottom: 0px;
    right: 20px;
    font-weight: bold;
    color: white;  
    text-decoration: none;
}

.background {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: gray;
    mix-blend-mode: lighten;
    opacity: 0;
    transition: all .2s ease-in-out;
}

.more:hover {
    color: #dfdfdf;
    text-decoration: none;
}

.image:hover .background {
    opacity: 1;
}

.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    color: lightgrey;
    mix-blend-mode: lighten;
    transition: all .2s ease-in-out;
}

.image:hover .icon {
    opacity: 1;
}

</style>