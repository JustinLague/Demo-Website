<template>
<div>
    <div v-for="p in formatedArray" :key="p.length">
        <div class="row">
            <div class="col-lg-6" v-for="portfolio in p" :key="portfolio.id">
                <router-link :to="{name: 'Project', params: { projectId: portfolio.image.projectId }}">
                    <div class="image">
                        <img :src=portfolio.image.url>
                        <p class="description">
                            <strong>
                                {{ portfolio.description }}
                            </strong>
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['portfolios'],
    computed: {
        formatedArray() {
            const result = []
            for (let i = 0; i < this.portfolios.length; i += 2)
                result.push(this.portfolios.slice(i, i + 2))
            return result
        }
    }
}
</script>

<style scoped>
.description {
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