import {responselist} from '../../utils/request'

const state={
    list:[]
}
const mutations={
    changeList(state,list){
        state.list = list
    }
}
const actions={
     responseList(context){
        responselist().then((res)=>{
            context.commit("changeList",res.data.list)
        })
     }
}
const getters={
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}