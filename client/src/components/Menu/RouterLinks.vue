<template>
   <div class="links">
           <div>
                <router-link :class="[isHamburger ? 'hamburger':'']" to="/Portfolio">{{ $t('portfolio.title') }}</router-link>
            </div>
            <div>
                <router-link :class="[isHamburger ? 'hamburger':'']" to="/">{{ $t('gallery.title') }}</router-link>
            </div>
            <div class="about">
                <router-link :class="[isHamburger ? 'hamburger':'']" to="/About">{{ $t('about.title') }}</router-link>
            </div>
            <div>
                <router-link :class="[isHamburger ? 'hamburger':'']" to="/Enquiries">{{ $t('enquiries.title') }}</router-link>
            </div>
            <div>
                <router-link :class="[isHamburger ? 'hamburger':'']" to="/resume">{{ $t('resume.title') }}</router-link>
            </div>
        </div>  
</template>

<script>
export default {
    props: {
        isHamburger: Boolean
    }
}
</script>

<style scoped>
a {
    color: black; 
    text-decoration: none;
}

.hamburger { 
    color: #707070;
    text-decoration: none;
}

a:hover {
    color: #808080;
    text-decoration: none;
}

.about {
    padding-top: 20px;
}
</style>