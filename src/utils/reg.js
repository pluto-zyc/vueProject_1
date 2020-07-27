//验证手机号
export const regTel=tel=>{
    var reg=/^1[3456789]\d{9}$/g;
    return reg.test(tel)
}

//验证身份证号
export const regIds=ids=>{
    var reg=/^(\d{18,18}|\d{15,15}|\d{17,17}X)$/g;
    return reg.test(ids)
}