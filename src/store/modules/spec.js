import {requestSpecList
} from '../../utils/request'

const state = {
  list:[]
}

const mutations = {
    changeList(state,resList){
        state.list = resList
    }
}

const actions = {
    responseList(context,json){
        requestSpecList(json).then((res)=>{
            context.commit('changeList',res.data.list)
        })
    }
}

const getters ={
    list(state){
        return state.list
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
