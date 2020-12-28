<template>
    <div class="menu">
        <div class="title">
            <router-link to="/">
                <h2 class="name">
                    Daria Elas
                    <p>
                        <small class="text-muted">Artist</small>
                    </p>
                </h2>
            </router-link>
        </div>

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
            <div class="row">
                <span>
                    <a href="https://www.instagram.com/daria.elas/" id="instagram">
                        <b-icon class="icon" icon="instagram"></b-icon>
                    </a>
                    <a href="mailto:dariaalexandrae@gmail.com">
                        <b-icon id="icon-env" icon="envelope"></b-icon>
                    </a>
                </span>  
            </div>
        </div> 
        
        <div class="footer">
            <p>
                I don't like mail, 
            <br>
                but i can't escape them. 
            </p>
        </div>

        <div id="gif">
            <img src="../assets/img/dariaHappyGif.gif" alt="">
        </div>
    </div>
</template>

<script>
export default {

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

@media (max-width: 1199.98px) { 
    .menu {
        position: inherit;  
    }
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
    color: black; 
    text-decoration: none;
}

a:hover {
    color: #808080;
    text-decoration: none;
}

#gif {
    display:block;
    width: 100px;
}
</style>