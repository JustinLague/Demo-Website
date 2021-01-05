<template>
  <div class="row menu">
        <div class="links">
           <div>
                <router-link to="/">{{ $t('portfolio.title') }}</router-link>
            </div>
            <div>
                <router-link to="/Gallery">{{ $t('gallery.title') }}</router-link>
            </div>
            <div class="about">
                <router-link to="/About">{{ $t('about.title') }}</router-link>
            </div>
            <div>
                <router-link to="/Enquiries">{{ $t('enquiries.title') }}</router-link>
            </div>
            <div>
                <router-link to="/resume">{{ $t('resume.title') }}</router-link>
            </div>
        </div>  

        <div class="lang">
            <button v-on:click="changeLocal('fr')">FR</button>
            <span>|</span>
            <button  v-on:click="changeLocal('en')">EN</button>
        </div>
        
        <div class="footer">
            <p>
                "I don't like men, 
            <br>
                but i can't escape them." 
            <br>
                - Liam Fraser 2020
            </p>
        </div>

        <div id="gif">
            <img src="../../assets/img/HappyGif.gif" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "HamburgerMenu",
    methods: {
        changeLocal: function (lang) {
            this.$i18n.locale = lang;
        }
    }
}
</script>

<style scoped>
.menu {  
    padding: 0px;
    margin-left: 31px;
}

.about {
    padding-top: 20px;
}

.name p small {
    font-size: 0.7em;
}

.links {
    width: 100%;
    font-weight: 400;
    line-height: 2em;
    font-size: 18px;
}

.follow {
    font-weight: 400;
    padding-top: 30px;
}

#instagram {
    padding-right: 25px;
}

.icon {
    font-size: 1.5em;
}

#icon-env {
    font-size: 1.7em;
}

.lang {
    width: 100%;
}

button {
    margin-top: 20px;
    background: #3F3F41;
    color: #808080;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
}

button:first-child {
    padding-left: 0px;
}

button:focus {
    outline: 0px auto -webkit-focus-ring-color;
}

.footer {
    color: #808080;
    font-weight: 400;
    padding-top: 20px;
    font-size: 0.8em;
}

a {
    color: #707070; 
    text-decoration: none;
}

a:hover {
    color: #808080;
    text-decoration: none;
}

#gif {
    margin-left: -25px;
    display:block;
    width: 200px;
}
</style>