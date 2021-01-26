<template>
  <div class="menu">
        <div class="title">
            <router-link to="/">
                <h2 class="name">
                    Daria Elas
                    <p>
                        <small class="text-muted">{{ $t('menu.artist') }}</small>
                    </p>
                </h2>
            </router-link>
        </div>

        <div class="links">
           <div>
                <router-link to="/Portfolio">{{ $t('portfolio.title') }}</router-link>
            </div>
            <div>
                <router-link to="/">{{ $t('gallery.title') }}</router-link>
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

        <div>
            <button  v-on:click="changeLocal('fr')">FR</button>
            <span>|</span>
            <button  v-on:click="changeLocal('en')">EN</button>
        </div>
        
        <div class="footer">
            <p>
                You need a quote 
            <br>
                Daria.
            </p>
        </div>

        <div id="gif">
            <img src="../../assets/img/HappyGif.gif" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "MenuLink",
     methods: {
        changeLocal: function (lang) {
            this.$root.$i18n.locale = lang;
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.menu {  
    padding: 0px;
    margin-top: 40px;
    margin-left: 31px;

    position: fixed;
}

.about {
    padding-top: 20px;
}

.name {
    font-size: 27px;
    font-weight: 500;
    font-style: normal;
    line-height: 1.2em;
    font-family: 'Quicksand', sans-serif;
}

.name p small {
    font-size: 0.7em;
}

.links {
    font-weight: 400;
    line-height: 2em;
    font-size: 18px;
}

.follow {
    font-weight: 400;
    padding-top: 30px;
}

#instagram {
    padding-left: 15px;
    padding-right: 20px;
}

.icon {
    font-size: 1.5em;
}

#icon-env {
    font-size: 1.7em;
}

button {
    margin-top: 20px;
    background: white;
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
    padding-top: 15px;
    font-size: 0.8em;
}

a {
    color: black; 
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