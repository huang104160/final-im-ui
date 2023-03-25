## 启动准备
- 修改 /src/utils/request.js  的 baseURL为后端服务地址
- 修改 /src/utils/websocket.js 的 url为后端netty服务端口,此项目默认使用8004端口，你可以根据需求修改，记得把后端netty服务端口改成一致的
- 修改 /src/utils/crypt/index.js 的CRYPTOJSKEY，和后端aplication.yml 的 crypto下的key一致，这里仅仅是对于前端向后端传数据时做了加密，后端接收做了解密而已，后端返回数据没有加密
## 启动方式
- 先在项目路径下执行下面代码
    ``` sh  
    npm install
- 然后
    ``` sh
    npm run dev