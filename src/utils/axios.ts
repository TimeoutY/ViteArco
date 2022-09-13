import axios from 'axios';
const _axios = axios.create({
  //   baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://localhost:3000',
  responseType: 'json',
});
// 请求拦截
_axios.interceptors.request.use(
  (config) => {
    // if (Store.state.user.token) {
    //   config.headers.Authorization = `Bearer ${Store.state.user.token}`
    // }
    return config;
  },
  (error) => {
    /*
    new Promise((resolve,reject)=>{
      reject('错误')
    })
    等效于
    Promise.reject('错误')
    */

    return Promise.reject(error);
  }
);
// 响应拦截
_axios.interceptors.response.use(
  (res) => {
    console.log(res);

    if (res.data.success) {
      // 成功处理
      return res.data;
    } else {
      // 失败处理
      // 提示错误信息
      // 让接口调用执行.catch,中止.then的执行
      return Promise.reject(res.data.message);
    }
  },
  (error) => {
    // console.dir(error)
    if (error.response && error.response.status === 401) {
      // 清除token：vuex中清除
      // Store.commit('user/setToken', '')
      // 清除用户信息：vuex中清除
      // Store.commit('user/setUserInfo', '')
      //   Store.commit('user/logout')
      // 提示错误信息
      //   Message.error(error.response.data.message)
      // 跳转到登录页
      // this.$router
      //   Router.push('/login?redirect=' + window.location.href.split('#')[1])
    }
    return Promise.reject(error);
  }
);
export default _axios;
