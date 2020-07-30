import {requestSeckillList} from '../../utils/request'
// 定义变量
const state = {
    list:[]
}
// 修改变量
const mutations = {
    changeList(state,resList){
        state.list = resList
    }
}
// 请求列表 并通知方法修改变量
const actions ={
    responseList(context){
        requestSeckillList().then((res)=>{
            context.commit('changeList',res.data.list)
        })
    }
}
// 暴露变量
const getters={
    list(state){
        return state.list
    }
}
// 暴露模块
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}