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
		<Search
			v-on:doSearch="searchShops"
			v-on:clearSearch="resetShops">
		</Search>
		<Shops
			class="floor"
			:city-for-shops="cityForShops"
			:pull-words-for-shops="pullWordsForShops">
		</Shops>
	</div>
</template>

<script>
	import Sliders from './../components/Sliders'
	import Cities from './../components/Cities'
	import Shops from './../components/Shops'
	import Search from './../components/Search'
	import { createRequest } from './../utils'

	export default {
		components: { Sliders, Cities, Shops, Search },

		data() {
			return {
				cityForShops: {
					name: '全部',
					district: '全部'
				},
				groupAd: {},
				pullWordsForShops: null
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
			},
			searchShops( pullWords ) {
				// pullWords => Array or singleString
				this.pullWordsForShops = pullWords
			},
			resetShops() {
				this.pullWordsForShops = null
			}
		}
	}
</script>