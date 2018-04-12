<template>
	<div class="search floor">
		<div class="search-top">
			<input type="text" v-model="kws" placeholder="搜索小区名" @keyup.enter="search"/>
			<button @click="search">搜索</button>
		</div>
		
		<div class="search-bottom">
			<p v-if="isWarnShow" class="kws-warn">搜索关键词不能超过10个字符</p>
			<p v-show="isInfoShow" class="kws-info">
				<button v-show="info !== '正在搜索...'" class="search-clear" @click="resetSearch">(清空搜索)</button>
				{{ info }}
			</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				kws: '',
				isWarnShow: false,
				isInfoShow: false,
				info: '',
				isSearching: false
			}
		},

		watch: {
			// TODO BUG
			'kws': function( nv ) {
				this.isSearching = false
			}
		},

		methods: {
			search() {
				// 不让重复点击发起大量搜索请求
				if( this.isSearching ) {
					return
				}

				const pureKws = this.kws.trim()

				// 关键词为空的时候 什么都不做
				if( pureKws === '' ) {
					return
				}

				// 关键词太长，警告
				if( this.kws.length >= 10 ) {
					this.isWarnShow = true
					this.isInfoShow = false
					return
				}

				this.isWarnShow = false
				this.isInfoShow = true
				this.isSearching = true

				// 单独处理长度为1的关键词，是因为pullword不分词，一个字不是词
				if( this.kws.length === 1 ) {
					this.info = `以下是搜索“${pureKws}”的结果，如果搜索不到，请缩短关键词再试试`
					this.$emit( 'doSearch', pureKws )
					return
				}

				const proxyUrl = 'https://bird.ioliu.cn/v1'
				// source: 词，param1: 分成词语的概率，param2: 是否显示概率
				const pullWordApi = `http://api.pullword.com/get.php?source=${ pureKws }&param1=0.6&param2=0&json=1`

				this.info = '正在搜索...'

				axios.get( `${proxyUrl}?url=${pullWordApi}`, {timeout: 5000} )
					.then( resp => {
						if( resp.status>=200 && resp.status<300 ) {
							return resp.data
						} else {
							return Promise.reject( '抱歉，搜索时发生网络错误，请重试' )
						}
					})
					.then( res => {
						this.info = `以下是搜索“${pureKws}”的结果，如果搜索不到，请缩短关键词再试试`
						this.$emit( 'doSearch', res.map(r => r.t) )
					})
					.catch( err => alert(err) )
			},
			resetSearch() {
				this.kws = ''
				this.isInfoShow = false
				this.$emit( 'clearSearch' )
			}
		}
	}
</script>

<style>
	.search {
		padding: 0 10px;
	}
	.search-top {
		margin-bottom: 6px;
	}
	.search-top input {
		width: 80%;
		padding: 2px 0 2px 4px;
	}
	.search-top button {
		width: 20%;
		padding: 4px 0;
		border: none;
		font-size: 14px;
		text-align: center;
		color: #fff;
		background-color: #2C7AF6;
	}
	.search-top input,
	.search-top button {
		vertical-align: middle;
	}
	.kws-warn {
		color: red;
	}
	.kws-info {
		color: #828282;
	}
	.kws-info,
	.kws-warn {
		font-size: 12px;
	}
	.search-clear {
		border: none;
		border-bottom: 1px solid #ff840c;
		color: #ff840c;
		font-size: 14px;
		background-color: rgba( 255, 255, 255, 0 );
	}
</style>