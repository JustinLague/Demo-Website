<template>
<div>
    <div v-for="a in formatedArray" :key="a.length">
        <div class="row">
            <div class="col-lg-6" v-for="image in a" :key="image._id">
                <enlargeable-image class="image" :src=image.detailedImageUrl :src_large=image.detailedImageUrl />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import EnlargeableImage from "@diracleo/vue-enlargeable-image";

export default {
    name: "ImageViewer",
    props: ['images'],
    components: {
        EnlargeableImage
    },
    computed: {
        formatedArray() {
            const result = []
            for (let i = 0; i < this.images.length; i += 2)
                result.push(this.images.slice(i, i + 2))
            return result
        }
    }
}
</script>

<style scoped>
.image {
    margin-bottom: 20px;
}
</style>