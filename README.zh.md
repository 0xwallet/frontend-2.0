<p align="center">
    <img width="480" src="https://wallet.owaf.org/static/media/logo.f7b1ca5d.png"/>
</p>

<a href="https://github.com/0xwallet/frontend-2.0">English</a>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/coreui/coreui-free-vue-admin-template">
    <img src="http://img.shields.io/badge/coreui-3.0.5-brightgreen.svg" alt="coreui">
  </a>
</p>

## 关于 0xWallet

0xWallet 是一款基于 NKN 网络的链上工具,包括任务发布和管理,网盘存储,上链(MetaNet)等
该项目致力于将区块链与生活链接,利用链上信息不可篡改的特性,保证文件的版权和任务的信息能够准确无误.

## 路线图

这是我们目前的路线图，请随时请求添加/更改。

| 功能                         | 进度 |
| :--------------------------- | :--: |
| 用户模块                     |  ✅  |
| NKN 钱包绑定                 |  ✅  |
| NKN 消息验证登录             |  ✅  |
| NKN 文件上传与进度监控       |  ✅  |
| 网盘主要逻辑(删除,改名,移动) |  ✅  |
| 网盘图片与 pdf 预览          |  ✅  |
| 网盘文件分享                 |  ✅  |
| MetaNet 网盘文件上链         |  🔜  |

## 已知问题与功能进度(持续更新)

2020-09-29

- ~~修复网盘页面可能不显示New和Upload按钮的问题~~
- ~~新增文件上传临时进度显示~~
- ~~搜索框新增遮罩层，点击遮罩层隐藏~~
- ~~聊天框新增遮罩层，点击遮罩层隐藏~~

2020-09-25

-   ~~左侧网盘空间显示异常~~
-   ~~多次分享文件地址异常~~
-   ~~个人空间不应展示 TxID~~
-   ~~网盘上传进度移动到右上角~~
-   搜索框动画无效,停留在页面左上角
-   上传文件之后出现多个 Toast 提示

## 安装

```
# 克隆仓库
git clone https://github.com/0xwallet/frontend-2.0 frontend

# 进入仓库目录
cd frontend

# 安装项目依赖
npm install
```

### 以开发模式编译并热部署

```
npm run serve
```

### 编译生产环境

```
npm run build
```

### 执行测试

```
npm run test
```

### 检查代码

```
npm run lint
```

## 文件目录

```
├── babel.config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── public
├── schema.json             // 后端的GraphQL Schema
├── schema.json.graphql
├── src
│   ├── App.vue
│   ├── assets
│   ├── common              // 公共文件夹, 主要是一些工具
│   ├── components          // Vue 的组件
│   ├── containers          // CoreUI 自带的一些容器和页面
│   ├── graphql             // 所有Gql结构
│   ├── main.ts
│   ├── router
│   ├── service             // 调用Gql的中间层
│   ├── store               // Vuex
│   └── views
├── tests
├── tsconfig.json
└── vue.config.js
```

## 主要开发者

[lty5240](https://github.com/lty5240)

## License
