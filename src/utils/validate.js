/**
 * 过滤特殊字符
 */
export function validusername(value) {
     let reg = /^1[3456789]\d{9}$/;
     return reg.test(value) ? true :false;
}

export function validpassword(value) {
    let reg = /^\w{6,20}$/;
    return reg.test(value) ? true : false;
} 