// 参考： https://segmentfault.com/a/1190000011007043

module.exports = {
  proxy: {
        '/backend': {    //将www.exaple.com印射为/apis
            target: 'http://localhost:9999',  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            // pathRewrite: {
            //     '^/': ''   //需要rewrite的,
            // }
            "pathRewrite": { "^/backend" : "/" },
        }
  }
}
