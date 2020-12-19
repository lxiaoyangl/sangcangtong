import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count:0
	},
	mutations: {
		changeCount(state,obj){
			if(obj.flag === 'add'){
				state.count += obj.num;
				return;
			}

			state.count -= obj.num;
		}
	}
})
