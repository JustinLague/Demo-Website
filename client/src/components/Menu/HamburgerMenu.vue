<template>
  <div class="row menu">

       <div>
            <RouterLinks :is-hamburger=true v-if=!isDashboard></RouterLinks>
            <AdminRouterLinks :is-hamburger=true v-if=isDashboard></AdminRouterLinks>
        </div>

        <div class="lang">
            <button v-on:click="changeLocal('fr')">FR</button>
            <span>|</span>
            <button  v-on:click="changeLocal('en')">EN</button>
        </div>

        <div class="links">
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

        <div id="gif">
            <img src="../../assets/img/HappyGif.gif" alt="">
        </div>
    </div>
</template>

<script>
import AdminRouterLinks from "./AdminRouterLinks";
import RouterLinks from "./RouterLinks";

export default {
    props: {
        isDashboard: Boolean
    },
    components: {
        AdminRouterLinks,
        RouterLinks
    },
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
    margin-top: 20px;
    margin-bottom: 20px;
}

.instagram {
    margin-left: 5px;
    margin-right: 17px;
}


.lang {
    width: 100%;
}

button {
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