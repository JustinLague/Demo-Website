<template>
<div>
    <div v-for="a in formatedArray" :key="a.length">
        <div class="row">
            <div class="col-lg-6" v-for="image in a" :key="image.id">
                <img :src=image.url>
                {{ $t('image.name', image.name) }}
                {{ $t('image.description', image.description) }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ImageViewer",
    props: ['images'],
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

<style>

</style>