<template>
	<swiper :options="options">
		<swiper-slide v-for="slider in sliders" v-if="slider.show">
			<a class="slider" :href="slider.link">
				<img :src="slider.img">
			</a>
		</swiper-slide>
		<div class="swiper-pagination"  slot="pagination"></div>
	</swiper>
</template>

<script>
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	import { createRequest } from './../utils'

	Vue.use( VueAwesomeSwiper )

	export default {
		data() {
			return {
				options: {
					autoplay: 3000,
					grabCursor : true,
					setWrapperSize :true,
					autoHeight: true,
					pagination : '.swiper-pagination'
				},
				sliders: []
			}
		},

		created() {
			createRequest( 'slider' )
				.then( sliders => {
					this.sliders = sliders
				})
				.catch( err => {
					alert( err )
				})
		}
}
</script>

<style>
	.slider {
		display: block;
		height: 200px;
		width: 100%;
		overflow: hidden;
	}
	.slider img {
		display: block;
		width: 100%;
	}
</style>