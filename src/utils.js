import axios from 'axios'

// 检查 axios 的状态码
function checkStatus( res ) {
	if( res.status >= 200 && res.status<300 ) {
		return Promise.resolve( res )
	} else {
		return Promise.reject( new Error(res.statusText) )
	}
}

// 构造请求
export function createRequest( type ) {
	let url = 'http://localhost:3000/api/' + type;
	
	return axios.get( url )
	.then( res => {
		return checkStatus( res )
	})
	.then( res => {
		const data = res.data
		if( data.success ) {
			return Promise.resolve( data.result )
		} else {
			return Promise.reject( data.error )
		}
	})
}