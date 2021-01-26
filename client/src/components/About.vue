<template>
<div class="content">
    <h2 class="main-title">{{ $t('about.title') }}</h2>

    <div class="row">
        <div class="col-lg-4 profil">
            <img src="../assets/img/PhotoDeProfil.jpg" alt="">
        </div>

        <div class="col-lg-6 col-12">
            <p>
                <strong>{{ $t('about.biographieName') }}</strong> 
                {{ $t('about.biographie') }} 
            </p>
            <p> 
                <strong>{{ $t('about.demarcheArtistiqueBold') }}</strong> 
                {{ $t('about.demarcheArtistique') }}
            </p>
            <p>
                {{ $t('about.demarcheArtistique2') }}
            </p>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
p { 
    text-align: justify;
    text-justify: inter-word;
}

.profil {
    margin-bottom: 30px;
}
</style>