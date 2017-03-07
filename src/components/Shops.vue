<template>
	<div style="margin-bottom: 100px;">
		<div class="floor-header wrap">
			<h1 class="fl">润农品质店</h1>
			<span class="shop-district fl"
						v-show="cityForShops.name != '全部'">
				( {{ cityForShops.name }} - {{ cityForShops.district }} )
			</span>
		</div>
		<ul class="shops">
			<li class="shop"
					v-for="shop in shops"
					v-if="shop.show"
					v-show="cityForShops.name == '全部'
									|| cityForShops.district == shop.address.district
									&& cityForShops.name == shop.address.city">
				<a :href="shop.link" style="display: block">
					<div class=" wrap shop-t">
						<div class="fl shop-t--l">
							<img :src="shop.logo">
						</div>
						<ul class="fl shop-t--m">
							<li>
								<h2 :class="{ 'shop-name--recommend': shop.recommend }">{{ shop.name }}</h2>
							</li>
							<li class="wrap">
								<i class="icon-star fl" v-for="s in shop.star"></i>
							</li>
							<li>
								<p>营业：{{ shop.openTime }}</p>
							</li>
						</ul>
						<ul class="fl shop-t--r">
							<li>
								<span class="price-1">￥{{ shop.priceBeforePost }}</span>
								<span class="price-txt">起送</span>
							</li>
							<li>
								<span class="price-2">￥{{ shop.postage }}</span>
								<span class="price-txt">配送</span>
							</li>
						</ul>
					</div>
				</a>
				<div class="shop-b">
					<p>简介：{{ shop.desc }}</p>
					<p>地址：{{ shop.address.city + shop.address.district + shop.address.detail }}</p>
					<a class="shop-tel" :href="`tel:${ shop.tel }`">电话：{{ shop.tel }}</a>
				</div>
			</li>
			<li>
				<p class="no-more">没有更多结果了...</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import { createRequest } from './../utils'

	export default {
		props: [ 'cityForShops' ],

		data() {
			return {
				shops: []
			}
		},

		created() {
			createRequest( 'shop' )
				.then( shops => {
					this.shops = shops.sort( (a, b) => a.rank - b.rank )
				})
				.catch( err => {
					alert( '无法连接服务器' )
				})
		}
	}
</script>

<style>
	.shop {
		margin-bottom: 10px;
		padding: 10px;
		background: #fff;
	}
	.shop-district {
		margin: 4px 0 0 20px;
		font-size: .14rem;
	}
	.shop-t {
		padding-bottom: 4px;
		margin-bottom: 4px;
		border-bottom: 1px dashed #e2e2e2;
	}
	.shop-t--l {
		width: 24%;
	}
	.shop-t--m {
		width: 48%;
		padding-left: 4px;
	}
	.shop-t--m li {
		margin-bottom: 4px;
	}
	.shop-t--r {
		width: 28%;
	}
	.price-1 {
		font-size: .22rem;
		color: #ff840c;
	}
	.price-2 {
		font-size: .16rem;
		color: #ff840c;
	}
	.price-txt {
		margin-left: 4px;
		font-size: .14rem;
		color: #999;
	}
	.shop-t--l img {
		width: 100%;
	}
	.shop-t--m h2 {
		color: #2E2727;
		font-size: .16rem;
	}
	.shop-t--m p {
		font-size: .14rem;
		color: #696969;
	}
	.shop-t--r li {
		margin-bottom: 4px;
		text-align: right;
	}
	.shop-b p,
	.shop-b a {
		font-size: .14rem;
	}
	.shop-name--recommend {
		color: #e62e2e !important;
	}
	.shop-tel {
		color: #EF4343;
	}
</style>