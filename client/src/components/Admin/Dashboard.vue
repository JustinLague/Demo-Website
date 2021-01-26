<template>
  <div class="container">
    <h2 class="main-title">Dashboard</h2>

    <div class="row">
        <div class="col-lg-4">
            <div class="card bg-light md-3">
                <div class="card-body">
                    <h5 class="card-title">Projet</h5>
                    <p class="card-text">Un projet s'agit d'un groupe de photos reliées.</p>
                    <router-link class="btn btn-primary" to="/admin/project">Ajouter un projet</router-link>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card bg-light md-3">
                <div class="card-body">
                    <h5 class="card-title">Portfolio</h5>
                    <p class="card-text">Un portfolio s'agit de la porte d'entrée d'un projet.</p>
                    <router-link class="btn btn-primary" to="/admin/portfolio">Ajouter un portfolio</router-link>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card bg-light md-3">
                <div class="card-body">
                    <h5 class="card-title">Galerie</h5>
                    <p class="card-text">La galerie s'agit d'un aperçu global de l'ensemble des réalisations.</p>
                    <router-link class="btn btn-primary" to="/admin/image">Ajouter des images</router-link>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.container {
    margin-top: 40px;
}
</style>