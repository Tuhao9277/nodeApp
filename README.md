# 🎉 Vue+Node 构建后台管理系统
Vue+Node.js构建的一个B端管理系统，包含基本的登录注册，鉴权，条目的增删改查等功能。
<img src="https://github.com/gsh0581/nodeApp/blob/master/img/houdai.png" width="1365" height="605" align=center />
<img src="https://github.com/gsh0581/nodeApp/blob/master/img/QQ20190819-212206.png" width="1365" height="605" align=center />
<img src="https://github.com/gsh0581/nodeApp/blob/master/img/QQ20190819-212225.png" width="1365" height="605" align=center />
# 🆕安装下载与预览
- 安装依赖包
- 
``` 
    yarn
 ```
 - 运行
```
yarn dev
```

## 入口文件地址
   http://localhost:8080
# 环境参数
- 技术语言：ES6 CSS 
- 框架：Node.js Vue ElementUI
- 辅助工具：Vue-Router, Vuex
- 插件 Mongoose+body-parser+gravatar+bcrypt+jsonwebtoken+passport+localstorage
- 开发工具 ： VsCode
- 构建工具 vueCLI

# 💞技术栈
- Client：vue + vuex +vue-router + ES6/ES7+axios+ElementUI
- Server：Node.js+Express+MongoDB+
- Plugin：Mongoose+body-parser+gravatar+bcrypt+jsonwebtoken+passport+localstorage

#  📚前后台主要实现功能及技术点
## 后台
- 使用body-parser对返回数据进行解析
- 使用gravatar全球公认头像保存头像数据
- 使用bcrypt对 密码加密
- 使用jsonwebtoken 用于在登录成功后为用户分配token令牌
- 使用bearer+Token加密接口
- 使用passport passport-jwt 验证token

## 前台
- 使用vueCLI
- 使用ElementUI，FontAwesome对前台界面进行布局美化
- 使用history路由模式，通过编程式导航实现界面的跳转
-  '*'捕获404的路由地址
- 通过在vue.config.js里代理配置，实现对服务器的跨域
- 使用axios向服务端发送请求
- 使用vue-router的路由守卫，对请求和响应拦截 ，判断token的状态
- 首页解析localstorage的token，并存储到vuex中
