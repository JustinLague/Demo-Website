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

        <div>
            <RouterLinks v-if=!isDashboard></RouterLinks>
            <AdminRouterLinks v-if=isDashboard></AdminRouterLinks>
        </div>

        <div>
            <button  v-on:click="changeLocal('fr')">FR</button>
            <span>|</span>
            <button  v-on:click="changeLocal('en')">EN</button>
        </div>
        
        <div v-if=!isDashboard class="links">
            <span>
                <a href="https://www.instagram.com/daria.elas/">
                    <b-icon class="instagram" id="icon-env" scale="1.4" icon="instagram"></b-icon>
                </a>
                <a href="mailto:dariaalexandrae@gmail.com">
                    <b-icon id="icon-env" scale="1.4" icon="envelope-open"></b-icon>
                </a>
            </span>
        </div>
        
        <!-- <div class="footer">
            <p>
                You need a quote 
            <br>
                Daria.
            </p>
        </div> -->

        <div v-if=!isDashboard id="gif">
            <img src="../../assets/img/HappyGif.gif" alt="">
        </div>
    </div>
</template>

<script>
import AdminRouterLinks from "./AdminRouterLinks";
import RouterLinks from "./RouterLinks";

export default {
    name: "MenuLink",
    components: {
        AdminRouterLinks,
        RouterLinks
    },
    props: {
        isDashboard: Boolean 
    },
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

button {
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

.links {
    margin-top: 20px;
    margin-bottom: 20px;
}

.instagram {
    margin-right: 16px;
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