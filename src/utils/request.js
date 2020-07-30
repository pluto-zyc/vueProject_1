import axios from "axios"
import qs from "qs"
import store from '../store/index'
import { successAlert, warningAlert } from '../utils/alert';
// 请求拦截
axios.interceptors.request.use(config => {
    if (config.url != baseUrl + '/api/userlogin') {
        config.headers.authorization = store.state.user.token;
    }
    return config
})

// 响应拦截
axios.interceptors.response.use(res=>{
    console.log("======url:"+res.config.url+"==============")
    console.log(res)
    if(res.data.msg==="登录已过期或访问权限受限"){
        warningAlert("登录已过期或访问权限受限")
        router.push("/login");
        return;
    }
    return res;
})
// 
const baseUrl = "/api"

// 提交菜单
 export const RequestAdd = (form) =>{
     return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
     })
 }
//  菜单列表请求
 export const responselist = (res) =>{
     return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params:{
            istree:true
        }
     })
 }
 //  菜单删除请求
 export const dellist = (id) =>{
     return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(id)
     })
 }
 //  菜单获取一条
 export const RequestDetail = (id) =>{
     return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: id
     })
 }
 //  菜单修改
 export const RequestMenuUpdate = (id) =>{
     return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(id)
     })
 }


 //角色添加
export const requestRoleAdd = params => axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(params)
})

//角色列表
export const requestRoleList = () => axios({
    url: baseUrl + "/api/rolelist",
    method: "get"
})

//角色获取一条
export const requestRoleDetail = (params) => axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params
})

//角色修改
export const requestRoleUpdate = (params) => axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(params)
})

//角色删除
export const requestRoleDelete = params => axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify(params)
})




//管理员添加
export const requestManageAdd = params => axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(params)
})

//管理员列表
export const requestManageList = (params) => axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params
})

//管理员获取一条
export const requestManageDetail = (params) => axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params
})

//管理员修改
export const requestManageUpdate = (params) => axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(params)
})

//管理员删除
export const requestManageDelete = params => axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify(params)
})
//管理员总数
export const requestManageNum = () => axios({
    url: baseUrl + "/api/usercount",
    method: "get"
})

//登录
export const requestLogin=params=>axios({
    url:baseUrl+"/api/userlogin",
    method:"post",
    data:qs.stringify(params)
})







//分类添加
export const requestCateAdd = (params) => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: formData
    })
}
//分类列表
export const requestCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}

//分类某一个条数据
export const requestCateDetail = params => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params
    })
}
//分类修改
export const requestCateUpdate = params => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: formData
    })
}

//分类删除
export const requestCateDelete = params => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(params)
    })
}



//商品规格添加
export const requestSpecAdd = params => axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(params)
})

//商品规格列表
export const requestSpecList = (params) => axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params
})

//商品规格获取一条
export const requestSpecDetail = (params) => axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params
})

//商品规格修改
export const requestSpecUpdate = (params) => axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(params)
})

//商品规格删除
export const requestSpecDelete = params => axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify(params)
})
//商品规格总数
export const requestSpecNum = () => axios({
    url: baseUrl + "/api/specscount",
    method: "get"
})




//商品添加
export const requestGoodsAdd = (params) => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: formData
    })
}
//商品列表
export const requestGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//商品某一个条数据
export const requestGoodsDetail = params => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params
    })
}
//商品修改
export const requestGoodsUpdate = params => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: formData
    })
}

//商品删除
export const requestGoodsDelete = params => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

//商品总数
export const requestGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}


//会员列表
export const requestMemberList = () => axios({
    url: baseUrl + "/api/memberlist",
    method: "get",
})

//会员获取一条
export const requestMemberDetail = (params) => axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params
})

//会员修改
export const requestMemberUpdate = (params) => axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(params)
})



//轮播图添加
export const requestBannerAdd = (params) => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: formData
    })
}
//轮播图列表
export const requestBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}

//轮播图某一个条数据
export const requestBannerDetail = params => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params
    })
}
//轮播图修改
export const requestBannerUpdate = params => {
    var formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: formData
    })
}

//轮播图删除
export const requestBannerDelete = params => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}



//秒杀添加
export const requestSeckillAdd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//秒杀列表
export const requestSeckillList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}

//秒杀某一个条数据
export const requestSeckillDetail = params => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params
    })
}
//秒杀修改
export const requestSeckillUpdate = params => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//秒杀删除
export const requestSeckillDelete = params => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(params)
    })
}



  






