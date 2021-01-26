<template>
  <div class="content">
    <h2 class="main-title">{{ $t('resume.title') }}</h2>

    <section class="row separation">
        <div class="col-4">
            <h6 class="sous-titre">{{ $t('resume.education') }}</h6>
        </div>
    </section>
    
    <section class="row">
        <div class="col-3">
            <div>2022</div>
            <div>2019</div>
        </div>
        <div class="col-8">
            <div>{{ $t('resume.school2022') }}</div>
            <div>{{ $t('resume.school2019') }}</div>
        </div>
    </section>
    
    <section class="row separation">
        <div class="col-4">
            <h6 class="sous-titre">{{ $t('resume.exposition') }}</h6>
        </div>
    </section>

    <section class="row">
        <div class="col-3">
            <div>2019</div>
            <div> - </div>
            <div>2017</div>
        </div>
        <div class="col-8">
            <div><i>Adopt</i>, Turtle Conservation And Education Center, Bali,Indonesia</div>
            <div><i>Light</i>, Café Melouay, Montreal (QC), Canada</div>
            <div><i>Metamorfosis</i>, Cercle Carré, Montreal (QC), Canada</div>
        </div>
    </section>

    <section class="row separation">
        <div class="col-4">
            <h6 class="sous-titre">PRESS</h6>
        </div>
    </section>

    <section class="row">
        <div class="col-3">
            <div>2017</div>
        </div>
        <div class="col-8">
            <div>Clément, É. (2017). Virée des galeries Metamorfosis : Artistes en herbes. <i>La Presse</i>. 25 mai 2017</div>
        </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.separation {
    margin-top: 30px;
}

section div {
    font-size: 0.92em;
}
</style>