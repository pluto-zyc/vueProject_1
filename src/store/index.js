import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {actions} from './actions'
import {state,mutations,getters} from './mutations'
import menu from "./modules/menu"
import role from './modules/role'
import manage from './modules/manage'
import spec from './modules/spec'
import cate from './modules/cate'
import goods from './modules/goods'
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu:menu,
        role:role,
        manage:manage,
        spec:spec,
        cate,
        goods
    }
})