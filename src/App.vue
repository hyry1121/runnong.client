<template>
	<div id="app">
		<div class="main-header">
			<img src="./assets/imgs/logo.png" />
		</div>
		<div class="main-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	.main-header {
		padding: 2px 0;
		background: #2e4e37;
	}
	.main-header img {
		display: block;
		margin: 0 auto;
		height: 40px;
	}
</style>