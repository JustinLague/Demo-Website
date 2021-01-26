<template>
	<div class="content">
		<h2 class="main-title">{{ $t('enquiries.title') }}</h2>
			{{ $t('enquiries.renseignement') }}
		<div>
			<a href="https://www.instagram.com/daria.elas/" id="instagram">
				<b-icon class="icon" icon="instagram"></b-icon>
				@daria.elas 
			</a>
		</div>
		<a href="mailto:dariaalexandrae@gmail.com">
			<b-icon id="icon-env" icon="envelope"></b-icon>
			dariaalexandrae@gmail.com 
		</a>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
a {
    color: black; 
	text-decoration: underline;
}

a:hover {
    color: #808080;
}
</style>