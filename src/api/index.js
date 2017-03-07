import axios from 'axios'

function checkStatus( res ) {
	if( res.status >= 200 && res.status<300 ) {
		return Promise.resolve( res )
	} else {
		return Promise.reject( new Error(res.statusText) )
	}
}

export default ( type ) => {
	return axios.get( 'http://localhost:3000/api/' + type )
	.then( res => {
		return checkStatus( res )
	}).then( res => {
		const data = res.data
		if( data.success ) {
			return Promise.resolve( data.result )
		} else {
			return Promise.reject( data.error )
		}
	})
}