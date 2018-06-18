import Axios from 'axios';
import Settings from 'config/settings.js'
import Store from '@/store';
import Router from '@/router/index.js';


// 创建axios实例
const ajax = Axios.create({
  baseURL: Settings.server, // api的base_url
  timeout: 20000 // 请求超时时间
});

// request拦截器
ajax.interceptors.request.use(config => {
  // Do something before request is sent
  //console.log(Store);
  if (Store.getters.getToken) {
    config.headers['X-Auth-Token'] = Store.getters.getToken; // 让每个请求携带token--['X-Auth-Token']为自定义key 请根据实际情况自行修改
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
ajax.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    let data = response.data;
    if (data.status === false) {
      var error = data.error;
      //认证失败、跳转到登录页面（说明用户没有登陆|或者登录已经超时，直接跳转到登录页面）
      if (Settings['state'].AUTH_FAIL === error.code.toString()) {
        // Message({
        //   message: error.message,
        //   type: 'error',
        //   duration: 5 * 1000
        // });

        // 登出
        // Store.dispatch('logout').then(() => {
        //   console.log(this);
        //   Router.push('/login');
        // });
      }
    }
    return data
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default ajax;
