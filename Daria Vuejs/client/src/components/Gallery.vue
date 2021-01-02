<template>
  <div class="content">
    <h1 class="main-title">Gallery</h1>
    <div v-if="galleryImages">
        <div v-for="galleryImage in formatedArray" :key="galleryImage.length">
            <div class="row">
                <div class="col-lg-6" v-for="image in galleryImage" :key="image.id">
                    <router-link :to="{name: 'Project', params: { projectId: image.projectId }}">
                        <div class="image">
                            <img :src=image.url>
                            <p class="name">
                                <strong>
                                  {{ image.name }}
                                </strong>
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
        this.$nextTick(function () {
          this.initGallery();
    })},
    computed: {
        ...mapState("gallery", ["galleryImages"]),
        formatedArray() {
            const result = []
            for (let i = 0; i < this.galleryImages.length; i += 2)
                result.push(this.galleryImages.slice(i, i + 2))
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
</style>