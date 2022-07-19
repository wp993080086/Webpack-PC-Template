<div align=center>
  
![webpack](https://img.shields.io/badge/5-webpack-orange)
![typeScript](https://img.shields.io/badge/4.4.0-typeScript-lightgrey)
![vue](https://img.shields.io/badge/3.2.33-vue-brightgreen)
  
</div>
<div align=center>

![axios](https://img.shields.io/badge/0.26.1-axios-ff69b4)
![vue-router](https://img.shields.io/badge/4.0.14-vue%20router-blueviolet)
![vuex](https://img.shields.io/badge/4.0.2-vuex-yellow)
![element-plus](https://img.shields.io/badge/2.1.11-element--plus-409EFF)
![sass](https://img.shields.io/badge/1.50.1-sass-orange)
  
</div>

# ⚡️ 简介

一个开箱即用，基于 `webpack 5` + `vue 3` + `typeScript` + `element Plus` + `vuex` + `vue-router 4` 的PC端项目模板。

# 🚀 开发

1. 安装

```
npm install
```

2. 运行

```
npm run serve
```

> 如果不需要使用jsx/tsx，请做如下操作。

- 删除`tsconfig.json`文件里的 `"plugins": [{"name": "typescript-plugin-css-modules"}]`
- 删除`vite.config.ts`文件里的 `requireModuleExtension: true`

> 否则，请在根目录创建.vscode文件夹，并创建settings.json文件，并写入如下代码

```
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

# 📦️ 多环境打包

- 测试环境打包

```
npm run build_test
```

- 生产环境打包

```
npm run build
```

# 🔧 代码检查修复

- 格式检查

```
npm run lint
```

- 自动修复

```
npm run lint-fix
```

# 📚 目录

```
├─ .env.xxx // 各环境的配置文件
├─ .eslintrc.js // eslint配置
├─ vite.config.ts // 项目配置
├─ tsconfig.json // ts配置
├─ index.html // 入口文件
└─ src
  │─ App.vue // 根容器
  │─ main.ts
  │  
  ├─ components // 组件
  │          
  ├─ config // 项目级配置
  │    │
  │    └─index.ts
  │      
  ├─ pages // 页面
  │                          
  ├─ router // 路由
  │          
  ├─ servers // 接口
  │   │  
  │   │─ request.ts // 封装
  │   └─ api // 接口
  │      
  ├─ assets // 静态资源
  │              
  ├─ store // pinia             
  │      
  ├─ types // ts类型定义
  │      
  └─ utils // 工具库
  │ │  index.ts
  │ │  loading.ts // loading封装
  │ │  toast.ts // 弹窗封装
  │ └─md5
  └─
```
