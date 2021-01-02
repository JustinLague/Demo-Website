<template>
  <div class="row menu">
        <div class="links">
            <div>
                <router-link to="/">Portfolio</router-link>
            </div>
            <div>
                <router-link to="/Gallery">Gallery</router-link>
            </div>
            <div class="about">
                <router-link to="/About">About</router-link>
            </div>
            <div>
                <router-link to="/Enquiries">Enquiries</router-link>
            </div>
        </div>  

        <div class="follow">
            <div>
                <a href="https://www.instagram.com/daria.elas/" id="instagram">
                    <b-icon class="icon" icon="instagram"></b-icon>
                </a>
                <a href="mailto:dariaalexandrae@gmail.com">
                    <b-icon id="icon-env" icon="envelope"></b-icon>
                </a>
            </div>
        </div> 
        
        <div class="footer">
            <p>
                I don't like men, 
            <br>
                but i can't escape them. 
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

.footer {
    color: #808080;
    font-weight: 400;
    padding-top: 30px;
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