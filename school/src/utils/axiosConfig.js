import axios from "axios";

axios.interceptors.request.use(function(config){
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
},function(error){
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
    const headerAuth = response.headers['authorization'];
    console.log(headerAuth)
    if (headerAuth) {
      // 去掉一次 Bearer 前缀
      const token = headerAuth.replace(/^Bearer\s*/, '');
      localStorage.setItem('token', token);
    }
    return response
},function(error){
    const {status} = error.response
    if(status===401){
        localStorage.removeItem("token")
        window.location.href = "/login"

    }
    return Promise.reject(error)
})