# Step-by-Step搭建项目
vue3 + element-plus + echarts

# 1 环境搭建

见[VSCode前端开发环境搭建](./VSCode前端开发环境搭建.md)

# 2 项目初始化

> see: How to

```shell
# npm 7+
npm create vue@latest
cd cz-vue3-element-admin
npm install
npm run dev
```

![](https://czmdi.cooperzhu.com/technology/vue/vue3-element-plushuan-jing-da-jian-step-by-step/2_1.svg)

# 3 代码规范ESLint + Prettier

## 3.1 ESLint

- 修改eslint配置文件

```typescript
// /.eslintrc.cjs
// 添加

module.exports = {
    rules: {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型警告
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
};
```

- 新建`/.eslintignore`

```ini
# /.eslintignore

node_modules
/public
/docs
/src/assets
/dist
/bin
/build
.idea
.vscode
*.sh
*.md
*.woff
*.ttf
.husky
.local
# /**/*.d.ts
```

## 3.2 Prettier

- 删除`/.prettierrc.json`
- 新增/.prettierrc.cjs

```typescript
// /.prettierrc.cjs

/**
 * 格式化配置
 */
module.exports = {
    useTabs: false, // 是否使用tab
    tabWidth: 2, // 每个tab的空格数
    semi: true, // 语句末尾是否添加分号
    singleQuote: true, // 是否使用单引号
    endOfLine: 'lf', // 换行符样式：\n(lf)|\r\n(crlf)|\r(cr)：<auto|lf|crlf|cr>
    printWidth: 180, // 每行最大字符数
    proseWrap: 'never', // 换行。<always|never|preserve>
    quoteProps: 'as-needed', //// 更改引用对象属性的时间。可选值"<as-needed|consistent|preserve>"
    trailingComma: 'all', // 多行时添加尾随逗号规则：<none|es5|all>，默认none
    bracketSpacing: true, // 是否在对象文字中的括号之间添加空格
    arrowParens: 'always', // 箭头函数参数周围是否包括括号：always: (x) => x \ avoid: x => x
    rangeStart: 0, // 格式化字符偏移量（包括和不包括）
    rangeEnd: Infinity, // 格式化字符偏移量（包括和不包括）
    requirePragma: false, // 指定要使用的解析器，不需要写文件开头的 @prettier
    insertPragma: false, // 不需要自动在文件开头插入 @prettier
    htmlWhitespaceSensitivity: 'css', // 指定HTML文件的全局空格敏感度 <css|strict|ignore>
    vueIndentScriptAndStyle: false, // Vue文件脚本和样式标签缩进
};
```

- 新增`/.prettierignore`

```ini
# /.prettierignore

node_modules
/public
/docs
/src/assets
/dist
/bin
/build
.idea
.vscode
*.sh
*.md
*.woff
*.ttf
.husky
.local
# /**/*.d.ts
```

# 4 路由别名

> 使用vue模板创建项目时，已默认安装和配置好`@types/node`，所以可以直接使用

```typescript
// App.vue
import HelloWorld from './components/HelloWorld.vue';
                        ↓
import HelloWorld from '@/components/HelloWorld.vue';
```

# 5 环境变量

> see：https://cn.vitejs.dev/guide/env-and-mode.html

# 5.1 文件命名格式

```properties
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

## 5.2 配置

- 开发环境：`/.env.dev`

```properties
# /.env.dev
# 新建 
# 开发环境

# 自定义变量，必须以VITE_开头
VITE_APP_TITLE = 'cz-vue3-element-admin'
VITE_HTTP_API_BASE_URL = 'http://localhost:8080/dev'
```

- 生产环境：`/.env.prod`

```properties
# /.env.prod
# 新建 
# 正式环境

# 自定义变量，必须以VITE_开头
VITE_APP_TITLE = 'cz-vue3-element-admin'
VITE_HTTP_API_BASE_URL = 'http://localhost:8080/prod'
```

- 测试环境：`/.env.test`

```properties
# /.env.test
# 新建 
# 测试环境

# 自定义变量，必须以VITE_开头
VITE_APP_TITLE = 'cz-vue3-element-admin'
VITE_HTTP_API_BASE_URL = 'http://localhost:8080/test'
```

## 5.3 IDE自动提示

```typescript
// /env.d.ts
// 添加

// 环境变量类型
interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_HTTP_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## 5.4 package.json

```json
// package.json
// 添加

{
    "scripts": {
        "dev": "vite --mode dev",
        "test": "vite --mode test",
        "prod": "vite --mode prod",
    }
}
```

## 5.5 环境启动

```shell
npm run dev      # 开发环境
npm run test     # 测试环境
npm run prod     # 正式环境
```

## 5.6 IDE示例

![](https://czmdi.cooperzhu.com/technology/vue/vue3-element-plushuan-jing-da-jian-step-by-step/5-6_1.svg)

# 6 element-plus

> see: https://element-plus.org/zh-CN/

## 6.1 安装

```shell
npm install element-plus
```

## 6.2 配置

- tsconfig.json

```json
// /tsconfig.node.json
// 添加

{
  "compilerOptions": {
    "types": ["element-plus/global"]
  },
}
```

- ComponetService.ts

```typescript
// /src/components/ComponetService.ts
// 新建

import type { App } from 'vue';
import ElementPlus from 'element-plus';

const ComponetService = {
  setupGlobalComponent(app: App) {
    app.use(ElementPlus);
  },
};
export default ComponetService;
```

- 全局注册

```typescript
// /src/main.ts
// 添加

import 'element-plus/theme-chalk/index.css';
import ComponetService from '@/components/ComponetService';

ComponetService.setupGlobalComponent(app);
```

## 6.3 示例

```vue
// /src/App.vue
// 添加

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
</script>

<template>
  <el-button type="primary" :icon="Edit" circle></el-button>
</template>
```

# 7 状态管理Pinia

> 使用vue模板创建项目时，已默认安装，这里仅进行优化

## 7.1 配置

- StoreService.ts

```typescript
// /src/stores/StoreService.ts
// 新建

import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

const StoreService = {
  setup(app: App<Element>) {
    app.use(store);
    this._init();
  },

  _init() {
    console.log('Store init');
  },
};

export default StoreService;
export { store };
```

- 全局注册

```typescript
// /src/main.ts
// 替换

import { createPinia } from 'pinia';
app.use(createPinia());
               ↓
import StoreService from '@/stores/StoreService';
StoreService.setup(app);
```

## 7.2 使用规则

在`/src/stores/module`目录下创建状态管理类，在需要使用的地方import该类进行管理。

## 7.3 示例

以用户状态存储和管理为示例进行说明。

### 7.3.1 在`modules`目录下创建`用户状态管理类userStore.ts`

```typescript
// /src/stores/modules/userStore.ts
// 新建

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { store } from '../StoreService';

const useStore = defineStore('UserStore', () => {
  // state
  const openId = ref<string>('user_open_id');
  const nickname = ref<string>('user_nickname');
  const avatar = ref<string>('user_avatoar');

  // actions
  function updateNickname(val: string) {
    nickname.value = val;
  }

  return {
    openId,
    nickname,
    avatar,
    updateNickname,
  };
});

const userStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { userStoreHook };
```

### 7.3.2 创建测试页面

```vue
// /src/views/testing/store.vue
// 新建

<!-- 正确运行 -->
<!-- <template>测试Store</template>
<script setup lang="ts">
import userStore from '@/store/modules/userStore';
function testStore() {
  console.log('\n============================begin test store============================');
  console.log(userStore.nickname);
  userStore.updateNickname('NICK_NAME');
  console.log(userStore.nickname);
  console.log('============================end test store============================');
}

testStore();
</script> -->

<!-- 将文件改成下面代码，正确运行 -->
<!-- <template>测试Store</template>
<script lang="ts">
import { userStoreHook } from '@/store/modules/userStore';

function testStore() {
  console.log('\n============================begin test store============================');
  console.log('without setup', userStoreHook.nickname);
  userStoreHook.updateNickname('NICK_NAME_WITHOUT_SETUP');
  console.log('without setup', userStoreHook.nickname);
  console.log('============================end test store============================');
}
export default testStore;
</script> -->

<!-- 将文件改成下面代码，正确运行， -->
<!-- 因为已在userStore.ts中const userStoreHook = useStore(store);声明在useStore()前。but why? -->
<template>测试Store</template>
<script lang="ts">
import userStore from '@/store/modules/userStore';

function testStore() {
  console.log('\n============================begin test store============================');
  console.log('store: without setup', userStore.nickname);
  userStore.updateNickname('NICK_NAME_WITHOUT_SETUP');
  console.log('store: without setup', userStore.nickname);
  console.log('============================end test store============================');
}
export default testStore;
</script>
```

### 7.3.3 引入测试页面

```vue
// /src/views/testing/index.vue
// 添加

<template>
  <button @click="testStoreHandler">Test Store</button>
</template>

<script setup lang="ts">
import testStore from '@/views/testing/store.vue';

function testStoreHandler() {
  testStore();
}
</script>
```

### 7.3.4 运行结果

![](https://czmdi.cooperzhu.com/technology/vue/vue3-element-plushuan-jing-da-jian-step-by-step/7-3-4_1.png)

# 8 路由router

> see: https://router.vuejs.org/zh/

## 8.1 优化配置

- 删除`/src/router/index.ts`

- RouterService.ts

```typescript
// /src/router/RouterService.ts
// 新建

import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import HomeView from '../views/HomeView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const constantRoutes: Array<RouteRecordRaw> = [
  // 将路由配置添加到此处
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/testing',
    name: 'testStore',
    component: () => import('../views/testing/index.vue'),
  },
];

const router = createRouter({
  routes: constantRoutes as RouteRecordRaw[],
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }), // 刷新时，还原滚动条位置
});

function setup(app: App<Element>) {
  app.use(router);
}

const RouterService = {
  router,
  setup,
};

export default RouterService;
```

- 全局注册

```typescript
// /src/main.ts
// 替换

import router from './router';
app.use(router);
               ↓
import RouterService from '@/router/RouterService';
RouterService.setup(app);
```

# 9 axios封装

> see: https://github.com/axios/axios
>
> see: https://blog.cooperzhu.com/you-ya-di-feng-zhuang-axiosyu-apiguan-li/

## 9.1 安装

```shell
npm install axios
```

## 9.2 axios封装

- axios封装


```typescript
// /src/api/HttpHelper.ts
// 新建

import axios, { type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig, type ResponseType } from 'axios';

import { handleGlobalBizError, handleGlobalHttpStatusError } from './handler';
import type { IHttpApiResponse } from './types';

const helper = {
  isDownload: function (response: AxiosResponse<IHttpApiResponse<any> | Blob>): boolean {
    return response.data instanceof Blob;
  },

  hasBizError: function (response: AxiosResponse<IHttpApiResponse<any> | Blob>): boolean {
    if (this.isDownload(response)) {
      return response.data.type === 'application/json';
    }

    return (response.data as IHttpApiResponse<any>)?.code !== 200;
  },

  download: function (response: any, defaultFileName?: string): void {
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.getFileName(response, defaultFileName);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  getFileName: function (response: any, defaultFileName?: string) {
    if (defaultFileName) {
      return defaultFileName;
    }

    let fileName = 'download';
    const contentDisposition = response.headers['content-disposition'];
    if (!contentDisposition) {
      return fileName;
    }

    const rfc5987Match = contentDisposition.match(/filename\*=(.*''.+)/); // Rfc5987
    if (rfc5987Match?.length === 2) {
      const tmp = rfc5987Match[1].split("''");
      if (tmp.length === 1) {
        fileName = decodeURI(tmp[0]);
      } else if (tmp.length === 2) {
        fileName = decodeURI(tmp[1]);
      }
    }

    if (!fileName) {
      const match = contentDisposition.match(/filename="(.+)"/); // other
      if (match?.length === 2) {
        fileName = decodeURI(match[1]);
      }
    }

    return fileName;
  },
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HTTP_API_BASE_URL, // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
});

axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // config.headers.set({
    //   'Content-Type': 'application/json; charset=utf-8',
    // });

    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.set('Authorization', `Bearer ${token}`);
    // }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse<IHttpApiResponse<any> | Blob>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    if (response.status !== 200) {
      return Promise.reject({
        isBizError: false,
        data: response,
      });
    }

    if (!helper.hasBizError(response)) {
      return response;
    }

    if (helper.isDownload(response)) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
          // BizError
          return reject({
            isBizError: true,
            data: fileReader.result,
          });
        };
        fileReader.readAsText(response.data as Blob);
      });
    }

    handleGlobalBizError(response.data as IHttpApiResponse<any>);
    return Promise.reject({
      isBizError: true,
      data: response.data,
    });
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    handleGlobalHttpStatusError(error.status);
    return Promise.reject({
      isBizError: false,
      data: error.response ?? error,
    });
  },
);

const HttpHelper = {
  get: function <T>(
    url: string,
    options?: {
      config?: AxiosRequestConfig<any>; // request配置
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<IHttpApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, options?.config)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        })
        .finally(function () {
          // always executed
        });
    });
  },

  post: function <T>(
    url: string,
    data?: any,
    options?: {
      config?: AxiosRequestConfig<any>; // request配置
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<IHttpApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data, options?.config)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        })
        .finally(function () {
          // always executed
        });
    });
  },

  put: function <T>(
    url: string,
    data?: any,
    options?: {
      config?: AxiosRequestConfig<any>; // request配置
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<IHttpApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(url, data, options?.config)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        })
        .finally(function () {
          // always executed
        });
    });
  },

  delete: function <T>(
    url: string,
    options?: {
      config?: AxiosRequestConfig<any>; // request配置
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<IHttpApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(url, options?.config)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        })
        .finally(function () {
          // always executed
        });
    });
  },

  /**
   * post JSON数据
   *
   * @param url url
   * @param data JSON格式数据
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * @returns
   */
  postJson: function <T>(url: string, data: {}, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    const config = {
      headers: {
        'Content-Type': 'application/json;charset:utf-8;',
      },
    };

    return this.post(url, data, {
      config: config,
      isThrow: isThrow,
    });
  },

  /**
   * post HTML form作为JSON数据
   * @param url url
   * @param formId form表单的id
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * @returns
   */
  postFormAsJson: function <T>(url: string, formId: string, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    const config = {
      headers: {
        'Content-Type': 'application/json;charset:utf-8;',
      },
    };

    const data = document.querySelector('#' + formId);
    return this.post(url, data, {
      config: config,
      isThrow: isThrow,
    });
  },

  /**
   * 使用post 'Content-Type': 'application/x-www-form-urlencoded'
   *
   * @param url url
   * @param data JSON格式数据
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * @returns
   */
  postUrlencoded: function <T>(url: string, data: {}, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset:utf-8;',
      },
    };
    return this.post(url, data, {
      config: config,
      isThrow: isThrow,
    });
  },

  /**
   * 使用post 'Content-Type': 'multipart/form-data'
   *
   * @param url url
   * @param data JSON格式数据。包含文件信息<br/>示例
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * {
   *    userId: 1,
   *    avatars: document.querySelector('#fileInput').files
   *  }
   *
   * input示例：
   * <input id="fileInput" type="file" name="avatars" multiple />
   * @returns
   */
  postMultipart: function <T>(url: string, data: {}, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return this.post(url, data, {
      config: config,
      isThrow: isThrow,
    });
  },

  /**
   * 上传多个文件（可包含其他数据字段）
   *
   * @param url url
   * @param data JSON格式数据。包含文件信息<br/>示例
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * {
   *    userId: 1,
   *    avatars: document.querySelector('#fileInput').files
   *  }
   *
   * input示例：
   * <input id="fileInput" type="file" name="avatars" multiple />
   * @returns
   * @see HttpHelper.postMultipart()
   */
  uploadFiles: function <T>(url: string, data: {}, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    return this.postMultipart(url, data, isThrow);
  },

  /**
   * 使用GET请求下载
   *
   * @param url url
   * @param options 其他参数
   */
  getDownload: function (
    url: string,
    options?: {
      filename?: string; // 默认文件名
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<void> {
    const config = {
      responseType: 'blob' as ResponseType,
    };

    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, config)
        .then((response: any) => {
          helper.download(response, options?.filename);
          resolve();
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        });
    });
  },

  /**
   * 使用POST请求下载
   *
   * @param url url
   * @param data 请求参数
   * @param options 其他参数
   */
  postDownload: function (
    url: string,
    data: {},
    options?: {
      filename?: string; // 默认文件名
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<void> {
    const config = {
      responseType: 'blob' as ResponseType,
    };

    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data, config)
        .then((response: any) => {
          helper.download(response, options?.filename);
          resolve();
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        });
    });
  },
};

export default HttpHelper;
```

- 数据类型

```typescript
// /src/api/types.ts
// 新建

export interface IHttpApiResponse<T> {
  type: 'IHttpApiResponse';
  /** 请求的唯一id */
  requestId: string;
  /** 响应编码， 200-成功；非200-业务异常码 */
  code: number;
  /** 提示信息 */
  message: string;
  /** 应答消息体 */
  data: T;
}

export interface IHttpApiError<T> {
  type: 'IHttpApiError';
  /** 是否是业务异常 */
  isBizError: boolean;
  /** 错误详细数据 */
  data: any | IHttpApiResponse<T>;
}
```

- 全局错误处理

```typescript
// /src/api/handler.ts
// 新建

import type { IHttpApiResponse } from './types';

const handleGlobalHttpStatusError = (status: number): void => {
  let message = '未知错误';
  if (status) {
    switch (status) {
      case 400:
        message = '错误的请求';
        break;
      case 401:
        message = '未授权，请重新登录';
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求错误,未找到该资源';
        break;
      case 405:
        message = '请求方法未允许';
        break;
      case 408:
        message = '请求超时';
        break;
      case 500:
        message = '服务器端出错';
        break;
      case 501:
        message = '网络未实现';
        break;
      case 502:
        message = '网络错误';
        break;
      case 503:
        message = '服务不可用';
        break;
      case 504:
        message = '网络超时';
        break;
      case 505:
        message = 'http版本不支持该请求';
        break;
      default:
        message = `其他错误 --${status}`;
    }
  } else {
    message = `无法连接到服务器！`;
  }

  console.log(message);
};

const handleGlobalBizError = (resp: IHttpApiResponse<any>): void => {
  switch (resp.code) {
    case 200:
      break;
    case 30000:
      console.log(`Business Error: ${resp.message}`);
      break;
    default:
  }
};

export { handleGlobalHttpStatusError, handleGlobalBizError };

export default {};
```

## 9.3 模块API

> 以test模块为示例

- API文件

```typescript
// /src/api/modules/test/index.ts
// 新建

import HttpHelper from '@/api/HttpHelper';
import type { IHttpApiResponse } from '@/api/types';
import type { CreateRequestV1, CreateResponseV1 } from './types';

const Api = {
  v1: {
    create: '/v1/test/create',
  },
};

const test = {
  create: function (params: CreateRequestV1): Promise<IHttpApiResponse<CreateResponseV1>> {
    return HttpHelper.postJson(Api.v1.create, params, true);
  },
};

export default test;
```

- 数据类型

```typescript
// /src/api/modules/test/types.ts
// 新建

export interface CreateRequestV1 {
  testId: number;
  name: string;
}
export interface CreateResponseV1 {
  message: string;
}
```

## 9.4 统一API export

```typescript
// /src/api/HttpApi.ts
// 新建

import test from "./modules/test";

const HttpApi = {
  test,
};

export default HttpApi;
```

## 9.5 示例

```vue
// /src/views/testing/index.vue
// 添加

<template>
  <button @click="testHttpApi">Test HttpApi</button>
</template>

<script setup lang="ts">
import HttpApi from '@/api/HttpApi';

function testHttpApi() {
  HttpApi.test
    .create({
      testId: 1234,
      name: 'Tom',
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
```

# 10 自定义SVG组件 (vite-plugin-svg-icons)

> see; https://github.com/vbenjs/vite-plugin-svg-icons

## 10.1 安装

```shell
npm install vite-plugin-svg-icons
```

## 10.2 配置

- 创建svg文件存放路径：`src/assets/icons`

- vite.config.ts

```typescript
// /vite.config.ts
// 添加

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path'

export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 指定icons路径
        symbolId: 'icon-[dir]-[name]', // symbolId格式
      }),
    ],
  };
};
```

- tsconfig.json

```json
// /tsconfig.json
// 添加

{
  "compilerOptions": {
    "types": ["vite-plugin-svg-icons/client"]
  },
}
```

- 全局注册

```typescript
// /src/main.ts

import 'virtual:svg-icons-register';
```

- 组件声明

```vue
<template>
  <!--优先采用width和height。如果width/height未定义，则采用size-->
  <svg aria-hidden="true" class="svg-icon" :style="'width:' + (width ?? size) + ';height:' + (height ?? size)">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: '#333',
  },
  size: {
    type: String,
    required: false,
    default: '1em',
  },
  width: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped>
.svg-icon {
  overflow: hidden;
  fill: currentColor;
}
</style>
```

## 10.3 示例

- 上传svg至`/src/assets/icons`

![](https://czmdi.cooperzhu.com/technology/vue/vue3-element-plushuan-jing-da-jian-step-by-step/10-3_1.svg)

- 页面引用

```vue
// /src/testing/index.vue
// 添加

<template>
    <SvgIcon name="logo" color="#FF0000" />
    <SvgIcon name="menu-dict" color="#FF0000" />
    <SvgIcon name="menu-language" color="#FF0000" size="32px" /><!-- 使用logo.svg重命名为language.svg -->
    <SvgIcon name="basic-language" color="#FF0000" width="40px" height="64px" />
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
</script>
```

# 11 Layout

## 11.1 基本layout框架

> see: https://blog.cooperzhu.com/css-simple-admin-layout/

- 创建layout文件

```vue
// /src/layouts/default/index.vue
// 添加

<template>
  <div class="app-wrapper">
    <!-- 手机设备侧边栏打开遮罩层 -->
    <div id="drawer-bg" class="drawer-bg" @click="toggleSidebar"></div>

    <div id="sidebar-wrapper" class="sidebar-wrapper">
      sidebar-wrapper

      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/testing">Test</RouterLink></li>
      </ul>
    </div>
    <div class="main-wrapper">
      <div id="header-wrapper" class="header-wrapper">
        <div>
          <button id="btnToggle" @click="toggleSidebar">&lt;&lt;</button>
        </div>
        <div>全屏 &nbsp;&nbsp;&nbsp;&nbsp;头像</div>
      </div>
      <div id="content-wrapper" class="content-wrapper">
        Content
        <button @click="toggleFullContent">全屏</button><br />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const smallMaxWidth = 768; // px
const middleMaxWidth = 1200; // px
const sidebarShortWidth = 54; // px

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var drawerBg = document.getElementById('drawer-bg');

  var width = document.body.clientWidth;
  if (width > middleMaxWidth) {
    sidebar?.classList.remove('sidebar-wrapper-middle-show');
    sidebar?.classList.remove('sidebar-wrapper-small-show');
    drawerBg?.classList.remove('drawer-bg-small-show');
    sidebar?.classList.toggle('sidebar-wrapper-big-hide');
  } else if (width <= smallMaxWidth) {
    sidebar?.classList.remove('sidebar-wrapper-big-hide');
    sidebar?.classList.remove('sidebar-wrapper-middle-show');
    sidebar?.classList.toggle('sidebar-wrapper-small-show');
    drawerBg?.classList.toggle('drawer-bg-small-show');
  } else {
    sidebar?.classList.remove('sidebar-wrapper-big-hide');
    sidebar?.classList.remove('sidebar-wrapper-small-show');
    drawerBg?.classList.remove('drawer-bg-small-show');
    sidebar?.classList.toggle('sidebar-wrapper-middle-show');
  }

  const btnToggle = document.getElementById('btnToggle') as HTMLButtonElement | null;
  if (btnToggle) {
    if (sidebar?.clientWidth && sidebar?.clientWidth > sidebarShortWidth) {
      btnToggle.innerHTML = '&lt;&lt;';
    } else {
      btnToggle.innerHTML = '&gt;&gt;';
    }
  }
}

function toggleFullContent() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var header = document.getElementById('header-wrapper');
  var content = document.getElementById('content-wrapper');
  sidebar?.classList.toggle('sidebar-wrapper-full-content');
  header?.classList.toggle('header-wrapper-full-content');
  content?.classList.toggle('content-wrapper-full-content');
}

window.addEventListener('resize', () => {
  var sidebar = document.getElementById('sidebar-wrapper');
  var drawerBg = document.getElementById('drawer-bg');

  sidebar?.classList.remove('sidebar-wrapper-big-hide');
  sidebar?.classList.remove('sidebar-wrapper-small-show');
  sidebar?.classList.remove('sidebar-wrapper-middle-show');
  drawerBg?.classList.remove('drawer-bg-small-show');
});
</script>

<style scoped>
/* @media (min-width: 768px)
        @media (min-width: 992px)
        @media (min-width: 1200px)
        @media (max-width: 767px) */
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-wrapper {
  display: flex;
  height: 100%;
}

.sidebar-wrapper {
  flex: 0 0 210px;
  display: block;
  overflow: auto;
  background: lightblue;
}

.main-wrapper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}

.header-wrapper {
  flex: 0 0 50px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  background: lightgreen;
}

.content-wrapper {
  flex: 1 1 auto;
  height: calc(100% - 50px);
  background: lightpink;
  overflow: auto;
}
</style>

<style scoped>
/* 大屏 & 中屏（>768px） */
@media (min-width: 768px) {
  .sidebar-wrapper-full-content {
    /* flex: 0 0 0 !important;
          overflow: hidden; */
    display: none !important;
  }

  .header-wrapper-full-content {
    /* flex: 0 0 0 !important;
          overflow: hidden; */
    display: none !important;
  }

  .content-wrapper-full-content {
    height: 100%;
  }
}
</style>

<style scoped>
/* all: 大屏（>=1200px） */
@media (min-width: 1200px) {
  .sidebar-wrapper-big-hide {
    /*display: none;*/
    flex: 0 0 54px;
    display: block;
  }
}
</style>

<style scoped>
/* 中屏（>768px && < 1200px） */
@media (max-width: 1200px) and (min-width: 768px) {
  .sidebar-wrapper {
    flex: 0 0 54px;
    display: block;
    overflow: hidden;
  }

  .sidebar-wrapper-middle-show {
    flex: 0 0 210px;
    display: block;
  }
}
</style>

<style scoped>
/* all: 小屏（<768px） */
@media (max-width: 768px) {
  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    display: none;
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    display: none;
  }

  #sidebar-wrapper.sidebar-wrapper-small-show,
  #drawer-bg.drawer-bg-small-show {
    display: block;
  }
}
</style>
```

- 更新App.vue

```vue
// /src/App.vue
// 替换

<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style scoped></style>
```

- 更新router

```typescript
// /src/router/RouterService.ts
// 修改

const DEFAULT_LAYOUT = () => import('@/layouts/default/index.vue');

const constantRoutes: Array<RouteRecordRaw> = [
  // 将路由配置添加到此处
  {
    path: '/',
    name: 'dashboard',
    component: DEFAULT_LAYOUT,
    redirect: '/dashboard/home',
    children: [
      {
        name: 'dashboard_home',
        path: '/dashboard/home',
        component: () => HomeView,
      },
    ],
    // component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: DEFAULT_LAYOUT,
    redirect: '/about/home',
    children: [
      {
        path: '/about/home',
        name: 'about_home',
        component: () => import('../views/AboutView.vue'),
      },
    ],
  },
  {
    path: '/testing',
    name: 'testing',
    component: DEFAULT_LAYOUT,
    redirect: '/testing/home',
    children: [
      {
        path: '/testing/home',
        name: 'testStore',
        component: () => import('../views/testing/index.vue'),
      },
    ],
  },
];
```

- 全局css

```css
// /src/assets/main.css
// 替换

@import './base.css';

html,
body,#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
```

## 11.2 侧边栏Sidebar

### 11.2.1 核心组件封装

- 类型声明文件

```typescript
// src/layouts/default/components/TwSidebar/types.ts
// 添加

interface IMenuItem {
  id: string; // id，全局唯一
  name: string; // 名称
  path?: string; // url（绝对路径）。支持外链
  icon?: string; // 菜单图标。icon路径。根目录为”/src/assets“
  visiable?: boolean; // 是否显示。true-是；false-否；
  children?: IMenuItem[];
}

export type { IMenuItem };
```

- 侧边栏核心组件

```vue
// src/layouts/default/components/TwSidebar/TwSidebarItem.vue
// 添加

<template>
  <template v-if="!hasChild(item)">
    <TwLink v-if="item.visiable === undefined ? true : item.visiable" :to="item.path ?? '#'">
      <ElMenuItem :index="item.id">
        <SvgIcon v-if="item.icon" :name="item.icon" />
        <template #title>
          {{ item.name }}
        </template>
      </ElMenuItem>
    </TwLink>
  </template>

  <ElSubMenu v-else :index="item.id" teleported>
    <template #title>
      <SvgIcon v-if="item.icon" :name="item.icon" />
      <span v-if="item.name">{{ item.name }}</span>
    </template>

    <TwSidebarItem v-for="child in item.children" :key="child.id" :item="child" />
  </ElSubMenu>
</template>

<script setup lang="ts">
import TwLink from './TwLink.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import type { PropType } from 'vue';
import type { IMenuItem } from './types';

defineProps({
  item: {
    type: Object as PropType<IMenuItem>,
    required: true,
  },
});

/**
 * 判断当前菜单是否包含可显示的子菜单
 *
 * @param item 当前菜单
 */
function hasChild(item: IMenuItem) {
  const effectives = item.children?.filter((item: any) => {
    if (undefined === item.visiable) {
      return true;
    }
    return item.visiable;
  });

  if (null == effectives || effectives.length === 0) {
    return false;
  }

  return true;
}
</script>
```

- link

```vue
// src/layouts/default/components/TwSidebar/TwLink.vue
// 添加

<template>
  <a v-if="DomUtil.isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import DomUtil from '@/utils/basic/DomUtil';
import { useRouter } from 'vue-router';

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const router = useRouter();
function push() {
  router.push(props.to).catch((err) => {
    console.error(err);
  });
}
</script>
```

- index

```vue
// src/layouts/default/components/TwSidebar/index.vue
// 添加

<template>
  <ElScrollbar>
    <ElMenu :default-active="currRoute.path" :unique-opened="false" :collapse="!appStore.sidebar.opened" mode="vertical">
      <TwSidebarItem v-for="item in items" :key="item.id" :item="item" />
    </ElMenu>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TwSidebarItem from './TwSidebarItem.vue';
import appStore from '@/stores/modules/appStore';
import type { PropType } from 'vue';
import type { IMenuItem } from './types';

defineProps({
  items: {
    type: Object as PropType<IMenuItem[]>,
    required: true,
  },
});

const currRoute = useRoute();
</script>
```

### 11.2.2 DomUtil

```typescript
// /src/utils/basic/DomUtil.ts
// 添加

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

const DomUtil = {
  hasClass,
  addClass,
  removeClass,
  isExternal,
};
export default DomUtil;
```

### 11.2.3 appStore

```typescript
// /src/stores/modules/appStore.ts
// 添加

import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { store } from '../StoreService';
import { ScreenWidthType } from '@/types';

const useStore = defineStore('AppStore', () => {
  // state
  const sidebar = reactive({
    opened: true,
    withoutAnimation: false,
  });
  const screen = reactive({
    widthType: ScreenWidthType.Big,
  });

  // actions
  function openSidebar() {
    sidebar.opened = true;
  }
  function closeSidebar() {
    sidebar.opened = false;
  }
  function toggleSidebar() {
    sidebar.opened = !sidebar.opened;
  }

  function changeScreenWidthType(type: ScreenWidthType) {
    screen.widthType = type;
  }

  return {
    sidebar,
    screen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    changeScreenWidthType,
  };
});

const appStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { appStoreHook };
```

### 11.2.4 types

```typescript
// /src/types/index.ts
// 添加

enum ScreenWidthType {
  Big,
  Middle,
  Small,
}

export { ScreenWidthType };
```

### 11.2.5 layout文件

> 详见代码记录

```vue
// /src/layouts/default/index.vue
// 修改

<div id="sidebar-wrapper" class="sidebar-wrapper">
    sidebar-wrapper

    <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/testing">Test</RouterLink></li>
    </ul>
</div>
                      ↓
<div id="sidebar-wrapper" class="sidebar-wrapper">
    <TwSidebar :items="menus" />
</div>

// 添加
window.addEventListener('resize', () => {
  var width = document.body.clientWidth;
  if (width > middleMaxWidth) {
    appStore.changeScreenWidthType(ScreenWidthType.Big);
    appStore.openSidebar();
  } else if (width <= smallMaxWidth) {
    appStore.changeScreenWidthType(ScreenWidthType.Small);
    appStore.closeSidebar();
  } else {
    appStore.changeScreenWidthType(ScreenWidthType.Middle);
    appStore.closeSidebar();
  }
});
```

