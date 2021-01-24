<template>
    <div class="content">
        <h2 class="main-title">{{ $t('portfolio.title') }}</h2>
        <div v-if="portfolios">
            <div v-for="p in formatedArray" :key="p.length">
                <div class="row">
                    <div class="col-lg-6" v-for="portfolio in p" :key="portfolio.id">
                        <router-link :to="{name: 'Project', params: { projectId: portfolio.projectId }}">
                            <div class="image">
                                <img :src=portfolio.imageUrl>
                                <p class="description">
                                    <strong>
                                        {{ $t('portfolio.description', portfolio.description) }}
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
            this.initPortfolio();
    })},
    computed: {
        ...mapState("portfolio", ["portfolios"]),
        formatedArray() {
            const result = []
            for (let i = 0; i < this.portfolios.length; i += 2)
                result.push(this.portfolios.slice(i, i + 2))
            return result
        }
    },
    methods: {
        ...mapActions("portfolio", ["initPortfolio"]),
    }
}
</script>

<style scoped>
.first {
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
}

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