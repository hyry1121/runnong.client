<template>
	<div>
		<div class="floor-header">
			<h1>城市</h1>
		</div>
		<ul class="cities">
			<li class="city wrap">
				<button
						:class="{ 'district-active': activeBtn == 'all' }"
						@click="SetActiveBtnAndEmit( 'all', {name: '全部', district: '全部'} )">
					全部
				</button>
			</li>
			<li class="city wrap" v-for="(city,cIndex) in cities">
				<h2 class="fl">{{ city.name }}：</h2>
				<ul class="wrap fl districts">
					<li class="fl" v-for="(district,dIndex) in city.districts.split('||')">
						<button
								:class="{ 'district-active': activeBtn == cIndex + '-' + dIndex }"
								@click="SetActiveBtnAndEmit( cIndex + '-' + dIndex, {name: city.name, district} )">
							{{ district }}
						</button>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import { createRequest } from './../utils'

	export default {
		data() {
			return {
				cities: [],
				activeBtn: 'all'
			}
		},

		created() {
			createRequest( 'city' )
				.then( cities => {
					this.cities = cities
				})
				.catch( err => {
					alert( '无法连接服务器' )
				})
		},

		methods: {
			SetActiveBtnAndEmit( btnIndex, city ) {
				this.activeBtn = btnIndex
				this.$emit( 'changeCityForShops', city )
			}
		}
	}
</script>

<style>
	.cities {
		padding: 6px 10px;
		background: #fff;
	}
	.city h2 {
		margin-top: 4px;
		font-size: .14rem;
	}
	.city {
		margin-bottom: 6px;
	} 
	.districts li {
		margin-left: 6px;
	}
	.city button,
	.districts button {
		padding: 2px 4px;
		border: 1px solid #2C7AF6;
		border-radius: 2px;
		outline: none;
		background: none;
	}
	.district-active {
		background: #2C7AF6 !important;
		color: #fff;
	}
</style>