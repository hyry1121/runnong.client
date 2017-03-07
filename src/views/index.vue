<template>
	<div>
		<Sliders class="floor"></Sliders>
		<div class="floor">
			<div class="floor-header">
				<h1>拼团</h1>
			</div>
			<a :href="groupAd.link">
				<img :src="groupAd.img" width="100%" />
			</a>
		</div>
		<Cities class="floor" v-on:changeCityForShops="setCityForShops"></Cities>
		<Shops class="floor" :city-for-shops="cityForShops"></Shops>
	</div>
</template>

<script>
	import Sliders from './../components/Sliders'
	import Cities from './../components/Cities'
	import Shops from './../components/Shops'
	import { createRequest } from './../utils'

	export default {
		components: { Sliders, Cities, Shops },

		data() {
			return {
				cityForShops: {
					name: '全部',
					district: '全部'
				},
				groupAd: {}
			}
		},

		created() {
			createRequest( 'group-ad' )
				.then( ads => {
					this.groupAd = ads[ 0 ]
				})
				.catch( err => {
					alert( '无法连接服务器' )
				})
		},

		methods: {
			setCityForShops( cityForShops ) {
				this.cityForShops = cityForShops
			}
		}
	}
</script>