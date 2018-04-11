<template>
	<div class="search floor">
		<div class="search-top">
			<input type="text" v-model="kws" placeholder="搜索小区名" @keyup.enter="search"/>
			<button @click="search">搜索</button>
		</div>
		
		<div class="search-bottom">
			<p v-if="isWarnShow" class="kws-warn">{{ warnText }}</p>
			<p v-show="isInfoShow" class="kws-info">
				<button v-show="info.indexOf(kws) != -1" class="search-clear" @click="resetSearch">(清空搜索)</button>
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
				warnText: ''
			}
		},

		watch: {
			'kws': function() {
				this.isWarnShow = false
				this.isInfoShow = false
			}
		},

		methods: {
			search() {
				const isTooLong = this.kws.length >= 10
				if( this.kws.trim()==='' || isTooLong ) {
					this.warnText = isTooLong ? '搜索关键词不能超过10个字符' : '搜索关键词不能为空'
					this.isWarnShow = true
					this.isInfoShow = false
					return
				}

				this.isWarnShow = false
				this.isInfoShow = true

				if( this.kws.length === 1 ) {
					this.info = `以下是搜索“${this.kws}”的结果，如果搜索不到，请缩短关键词再试试`
					this.$emit( 'doSearch', this.kws )
					return
				}

				const proxyUrl = 'https://bird.ioliu.cn/v1'
				// source: 词，param1: 分成词语的概率，param2: 是否显示概率
				const pullWordApi = `http://api.pullword.com/get.php?source=${ this.kws }&param1=0.6&param2=0&json=1`

				this.info = '正在搜索...'

				axios.get( `${proxyUrl}?url=${pullWordApi}` )
					.then( resp => {
						if( resp.status>=200 && resp.status<300 ) {
							return resp.data
						} else {
							return Promise.reject('搜索发生错误')
						}
					})
					.then( res => {
						this.info = `以下是搜索“${this.kws}”的结果，如果搜索不到，请缩短关键词再试试`
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
		width: 80%;
		margin-bottom: 6px;
	}
	.search-top input {
		width: 80%;
		padding-left: 2px;
	}
	.search-top button {
		width: 20%;
		border: none;
		font-size: 14px;
		color: #fff;
		background-color: #2C7AF6;
	}
	.search-top input,
	.search-top button {
		padding: 2px 0;
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