<template>
    <div class="content">
        <h2 class="main-title">{{ $t('gallery.title') }}</h2>

        <div v-if="galleryImages">
                <div class="row">
                    <div class="col-md-4 col-sm-6" v-for="image in galleryImages" :key="image._id">
                        <div class="image">
                            <enlargeable-image :src=image.thumnailUrl :src_large=image.detailedImageUrl>
                                <b-icon class=" loupe" icon="zoom-in"></b-icon>
                                <img :src=image.thumnailUrl />
                            </enlargeable-image>
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
    },
    methods: {
        ...mapActions("gallery", ["initGallery"]),
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

.image {
    position: relative;
    margin-bottom: 30px;
}

.more {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center; /** Y-axis align **/
    justify-content: center; /** X-axis align **/
    font-weight: bold;
    color: white;
    text-decoration: none;
    font-size: 0.9em;
    text-transform: uppercase;
}

.more:hover {
    text-decoration: none;
}

.background {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: rgba(0,0,0,0.3);
    opacity: 0;
    transition: all .2s ease-in-out;
}

.background:hover {
    background-color: rgba(0,0,0,0.6);
}

.image:hover .background {
    opacity: 1;
}

.loupe {
    position: absolute;
    width: 25%;
    height: 25%;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    color: lightgrey;
    transition: all .2s ease-in-out;
    -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
    filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
}

.image:hover .loupe {
    opacity: 1;
}

</style>