<p align="center">
    <img width="480" src="https://wallet.owaf.org/static/media/logo.f7b1ca5d.png"/>
</p>

<a href="https://github.com/0xwallet/frontend-2.0/blob/master/README.zh.md">中文文档</a>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/coreui/coreui-free-vue-admin-template">
    <img src="http://img.shields.io/badge/coreui-3.0.5-brightgreen.svg" alt="coreui">
  </a>
</p>

## About 0xWallet

0xWallet is an on-chain tool based on the NKN network, including task release and management, network disk storage, on-chain (MetaNet), etc.
The project is committed to linking the blockchain with life, using the non-tamperable characteristics of the information on the chain to ensure that the copyright of the file and the information of the task are accurate.

## Roadmap

This is our current roadmap, please feel free to request additions/changes.

| Features                                                  | Progress |
| :-------------------------------------------------------- | :------: |
| User Module                                               |    ✅    |
| NKN wallet binding                                        |    ✅    |
| NKN message verification login                            |    ✅    |
| NKN file upload and progress monitoring                   |    ✅    |
| The main logic of the network disk (delete, rename, move) |    ✅    |
| Online disk pictures and pdf preview                      |    ✅    |
| Network Disk File Sharing                                 |    ✅    |
| MetaNet network disk files on the chain                   |    🔜    |

## Known issues and Feature progress (continuous update)

2020-09-25

-   ~~The network disk space on the left is displayed abnormally~~
-   ~~The address of the shared file is abnormal~~
-   ~~Personal space should not display TxID~~
-   ~~The upload progress of the network disk is moved to the upper right corner~~
-   The search box animation is invalid and stays in the upper left corner of the page
-   Multiple Toast prompts appear after uploading files

## Project setup

```
# clone the repo
git clone https://github.com/0xwallet/frontend-2.0 frontend

# go into app's directory
cd frontend

# install app's dependencies
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

## Director

```
├── babel.config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── public
├── schema.json             // The schema generated by the backend
├── schema.json.graphql
├── src
│   ├── App.vue
│   ├── assets
│   ├── common              // common dir, some utils
│   ├── components          // vue common components
│   ├── containers          // Container provided by CoreUI
│   ├── graphql             // All graphql files, Apollo Client
│   ├── main.ts
│   ├── router
│   ├── service             // All services that call graphql
│   ├── store               // Vuex
│   └── views
├── tests
├── tsconfig.json
└── vue.config.js
```

## Maintainers

[lty5240](https://github.com/lty5240)

## License
