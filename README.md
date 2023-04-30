1. 在项目根目录中运行如下命令，初始化包管理配置文件package.json
```bash
npm init -y
```


2. 依赖包
express - npm install express
cors - npm install cors
mysql - npm install mysql@2.18.1
bcryptjs - npm i bcryptjs@2.4.3
joi - npm i joi@17.1.0
express-joi - npm i @escook/express-joi
jsonwebtoken - npm install jsonwebtoken
express-jwt - npm install express-jwt@5.3.3


3. 文件目录
router - 存放所有的 路由 模块。模块中，只存放客户端的请求与处理函数之间的映射关系
router_handle - 存放所有的 路由处理函数模块。模块中，只存放每个路由对应的处理函数

