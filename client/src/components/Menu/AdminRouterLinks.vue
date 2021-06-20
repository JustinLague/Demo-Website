<template>
    <div class="links">
        <div>
            <router-link :class="[isHamburger ? 'hamburger':'']" :to="{name: 'AdminPortfolio'}">{{ $t('portfolio.title') }}</router-link>
        </div>
        <div>
            <router-link :class="[isHamburger ? 'hamburger':'']" :to="{name: 'AdminGallery'}">{{ $t('gallery.title') }}</router-link>
        </div>
        <div class="about">
            <router-link :class="[isHamburger ? 'hamburger':'']" :to="{name: 'AdminAbout'}">{{ $t('about.title') }}</router-link>
        </div>
        <div>
            <router-link :class="[isHamburger ? 'hamburger':'']" :to="{name: 'AdminEnquiries'}">{{ $t('enquiries.title') }}</router-link>
        </div>
        <div>
            <router-link :class="[isHamburger ? 'hamburger':'']" :to="{name: 'AdminResume'}">{{ $t('resume.title') }}</router-link>
        </div>
    </div>  
</template>

<script>
export default {
    props: {
        isHamburger: Boolean,
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

.hamburger { 
    color: #707070;
    text-decoration: none;
}

.about {
    padding-top: 20px;
}
</style>