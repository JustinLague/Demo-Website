<template>
  <div class="content">
    <h1 class="first">Portfolio</h1>

    <div class="row">
        <div class="col-6">
            <router-link :to="{name: 'Project', params: { projectId: '5febd2bde66d533cf08c0b21' }}">
                <div class="image">
                    <img src="../assets/img/enfantQuarantaine.jpg" alt="">
                    <p class="description">
                        <strong>
                            Description du projet 1 
                        </strong>
                    </p>
                </div>
            </router-link>
        </div>
        <div class="col-6">
            <router-link :to="{ name: 'Project', params: { projectId: 2 }}">
                <div class="image">
                    <img src="../assets/img/LinesInTheSkies.jpg" alt="">
                    <p class="description">
                        <strong>
                            Description du projet 2
                        </strong>
                    </p>
                </div>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.first {
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
}

.imagine {
    margin-bottom: 20px;
    margin-right: 20px;
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