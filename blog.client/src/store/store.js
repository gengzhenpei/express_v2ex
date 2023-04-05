import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: ''||localStorage.getItem('userInfo'),
		token: ''||localStorage.getItem('token'),
	},
	mutations: {
		showPeople (state, msg) {
			state.name = msg
		},
		storeUserInfo(state, userInfo) {
			console.log('user_info', userInfo)
			localStorage.setItem('userInfo', userInfo)
			state.userInfo = userInfo
		}, 
		storeToken(state, token) {
			localStorage.setItem('token', token)
			state.token = token
		}
	}
})
export default store
