<template>
    <div>
        <div class="title" v-if="showMobileMenu">
            <router-link to="/">
                <h2 class="name">
                    Daria Elas
                    <p>
                        <small class="text-muted">{{ $t('menu.artist') }}</small>
                    </p>
                </h2>
            </router-link>
        </div>
        <slide v-if="showMobileMenu" right :closeOnNavigation="true">
            <hamburger-menu :is-dashboard=isDashboard></hamburger-menu>
        </slide>
        <menu-link :is-dashboard=isDashboard v-if="!showMobileMenu"></menu-link>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import MenuLink from './MenuLink'
import HamburgerMenu from './HamburgerMenu'

export default {
    name: "Menu",
    props: {
        isDashboard: Boolean
    },
    data: function () {
        return {
            screenWidth: 0
        }
    },
    components: {
        Slide,
        MenuLink,
        HamburgerMenu
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.screenWidth = window.innerWidth;
        });
        this.screenWidth = window.innerWidth;
    },
    computed: {
        showMobileMenu() {
            if (this.screenWidth == 0) 
                return false;

            return this.screenWidth <= 991;
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.title {
    margin-top: 28px;
    margin-left: 20px;
    width: 200px;
}

.name {
    font-size: 27px;
    font-weight: 500;
    font-style: normal;
    line-height: 1.2em;
    font-family: 'Quicksand', sans-serif;
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