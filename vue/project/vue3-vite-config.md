# vue3 项目框架搭建和配置

记录底层框架搭建，全局 TS 检测，自动导入，eslint 检测，vite 配置等一系列踩坑和解决办法

## 1.import 导入 .vue 文件和 tsx，TS 提示错误解决

1.在跟目录创建一个 types 文件夹，types 文件夹底下创建一个 shims-vue.d.ts 文件，文件代码如下：

```js
// types/shims-vue.d.ts
declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

```

2.修改 tsconfig.json 配置，include types 文件进去

```js
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["types"], //包含types文件夹下的所有文件，会自动读取*.d.ts系统文件
  "compilerOptions": {
    "jsx": "preserve",  //处理引入jsx文件报错
  },

}
```

## 2.vue3 中使用 ref 语法糖 \$ref,$toRef

使用 ref 总是需要处理.value 问题，所以引入了 ref 的语法糖\$ref 他本身就是一个 xxx.value 所以无需处理.value 的问题
参考文件链接地址:https://www.jb51.net/article/263363.htm

```js
const count = $ref(10)
const str = $ref('dddd')
```

第一步(必须)，在 vite 配置里面启动语法糖

```js
// 修改vite.config.ts
return {
  plugins: [
    vue({
      reactivityTransform: true //启用响应式语法糖$ref $computed $toRef
    })
  ]
}
```

第二步(可选),配置 tsconfig.json
在 compilerOptions 下添加 vue/ref-macros, 不然会报错 TS2304: Cannot find name '$ref'.虽然不影响使用,但是会影响开发体验

```js
"compilerOptions":{
    "types": ["vue/ref-macros"]
  }
```

第三步(可选),配置 eslint
在 eslintrc.cjs 中加上 global,不然会提示 ESLint: '$ref' is not defined.(no-undef)

```js
module.exports = {
  globals: {
    $: 'readonly',
    $$: 'readonly',
    $ref: 'readonly',
    $computed: 'readonly',
    $shallowRef: 'readonly',
    $customRef: 'readonly',
    $toRef: 'readonly'
  }
}
```

## 3.types 文件夹下 .d.ts 文件定义全局声明引用的时候，eslint 报错 error 'PlRouteRaw' is not defined no-undef 处理

1、创建 eslintrc-global.json 配置如下

```js
{
    "globals":{
        "PlRouteRaw":"readonly", //配置公共路由type PlRouteRaw
    }
}
```

2、修改 eslintrc.cjs 文件，引入 eslintrc-global.json

```js
module.exports = defineConfig({
  extends: [
    './.eslintrc-global.json' //继承eslintrc-global.json文件的配置
  ]
})
```

## 4.setup 标签支持定义组件名称 name

当使用 setup 放到 scrip 标签的时候，组件需要通过 name 去注册的时候，可以通过以下方式去修改，
参考地址：https://blog.csdn.net/zy21131437/article/details/124523320

第一种：新增加一个 script 标签，在这个标签中写入 name 属性，代码如下

```html
<template>
  <button>demo</button>
</template>

<script lang="ts">
  export default {
    name: 'TButton'
  }
</script>

<script lang="ts" setup></script>

<style scoped lang="less"></style>
```

第二种：使用一个叫做 “unplugin-vue-define-options” 的插件，这个插件本来确实不知道，有一次在看 Element Plus 的源码时发现了这个插件，发现在 Element Plus 中都是使用这个插件来对组件名进行注册的，因此学到了
具体方式如下：

第一步：安装，安装的方式很常规，就是 npm 的安装

```js
npm install unplugin-vue-define-options -D
```

第二步：集成，找到 vite.config.ts 文件，加入插件 unplugin-vue-define-options（由于我是使用了 vite 作为配置工具，那么这里就演示 vite 中的用法）

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions()]
})
```

第三步：集成完成之后，那么可以直接使用了，如果在 TypeScript 中报错了，那么调整一下就行了，比如在 d.ts 的配置文件中加入描述

```html
<template>
  <button></button>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'TButton'
  })
</script>

<style scoped></style>
```

第三种：这种方式其实也是 vue3 中的，只是它的 setup 用法是 vue3 早期的，这种方式其实没有 name 这个顾虑，可以直接写，这里也列一下吧

```html
<template>
  <div></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TButton'
  })
</script>

<style scoped lang="less"></style>
```

## 5.自动按需导入配置

通过插件 unplugin-auto-import/vite 实现自动按需导入。
使用参考地址：https://github.com/antfu/unplugin-auto-import
第一步：安装插件

```js
npm i -D unplugin-auto-import
```

第二步:引入组件,vite 配置

```js
//自动导入
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
  plugins: [
    AutoImport({
      /* options */
    })
  ]
})
```

## 6.环境变量自定义变量类型错误，都是字符串处理

参考地址:https://juejin.cn/post/7094940781726826526

<b>问题一、自定义的环境变量没有提示，使用环境变量的时候 ts 报错</b>
第一步：需要配置 ts 支持，根目录创建 env.d.ts 文件进行如下配置

```js
// env.d.ts文件配置
/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_XXX_XXXX: boolean;
    readonly VITE_XXXX_XXX: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}

```

第二步：配合 tsconfig.json 配置文件，读取 env.d.ts。

```js
{
  "include": ["env.d.ts"],
}
```

<b>问题二:自定义的环境变量的类型不正确，拿到的都是字符串类型</b>

第一步：在文件夹 build 下创建一个工具函数 useEnv.ts 将环境变量转换成正确的类型

```js
//useEnv.ts
export const useEnv = (envs: Record<string, string>): Plugin => {
  return {
    name: "vite:debug-env",
    config(config: UserConfig, env: ConfigEnv) {
      if (env) {
        const defineMap = {} as Record<string, any>;
        const envPrefix = Array.isArray(config.envPrefix)
          ? config.envPrefix
          : [config.envPrefix || "VITE_"];
        const pattern = new RegExp(`^${envPrefix.join("|")}`, "i");
        Object.keys(envs).forEach((key) => {
          if (pattern.test(key)) {
            const realName = (envs[key] as any).replace(/\\n/g, "\n");
            if (["true", "false"].includes(realName.toLowerCase())) {
              defineMap[`import.meta.env.${key}`] = JSON.parse(
                realName.toLowerCase()
              );
            } else {
              defineMap[`import.meta.env.${key}`] = JSON.stringify(realName);
            }
          }
        });
        return {
          define: defineMap,
        };
      }
      return;
    },
  };
};
```

第二步：vite.config.ts 引入工具函数 useEnv

```js
//vite.config.ts
import { useEnv } from "./build/useEnv";
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins:{
      useEnv(env),
    },
  };
});

```

## 7.elementUI 自定义样式修改支持

1.修复原始变量 var.scss 具体的语法参考 elementui 官网:https://element-plus.org/zh-CN/guide/theming.html#%E9%80%9A%E8%BF%87-scss-%E5%8F%98%E9%87%8F

2.vite 配置如下:

```js
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/plugins/elementPlus/var.scss" as *;  // element ui原始变量修改
          @use "@/styles/style_base.scss"; //项目样式文件
          `
        }
      }
    }
  }
})
```

## 8.全局配置自动导入 ElMessage，并且配置 TS 全局使用和提示

1.vite 配置支持自动导入如下

```js
//vite.config.ts
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    plugins:{
      AutoImport({
        imports: [
          "vue",
          {
            "@/utils/storage": [["*", "$plStore"]],
            "element-plus": [
              ["ElMessage", "$ElMessage"],
              ["ElMessageBox", "$ElMessageBox"],
              ["ElNotification", "$ElNotification"],
            ],
            dayjs: [["*", "dayjs"]],
          },
        ],
        dts: "./types/auto-import.d.ts",  //生成自动全局导入文件
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json", //生成全局eslint支持
        },
      }),
    },
  };
});

```

## 9.打包去掉 TS 报错校验

1.修改配置文件 package.json 文件

```js
//打包校验ts
{
  build:"run-p type-check build-only",
}

//打包不校验ts
{
  build:"run-p  build-only",
}
```

## 10.scss 不放在默认的 assets 目录下无法编译识别变量，并且报错

1.安装 postcss-scss

```js
 pnpm i postcss-scss
```

2.根目录创建 postcss.config.js

```js
module.exports = {
  parser: 'postcss-scss' //预处理器配置
}
```

3.vite 配置支持全局变量和引入全局基础样式

```js
//vite.config.ts
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/var.scss"; //全局变量
          @use "@/styles/style_base.scss"; //全局基础样式
          `
        }
      }
    }
  }
})
```

## vite3.x globEager 已弃用的解决方案

`js import.meta.globEager ` 已弃用采用 ` import.meta.glob` 替代

```js
const modules = import.meta.glob('./*/index.ts', {
  eager: true,
  import: 'default'
})
```

## vite 配置支持 eslint 检测

1.vite 配置文件修改

```js
//vite.config.ts
import eslint from "vite-plugin-eslint";
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: {
      eslint({ fix: false }),
    },

  };
});

```

2.根目录创建.eslintrc.cjs 文件进行 eslint 语法配置

```js
/* eslint-env node */
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    $: 'readonly',
    $$: 'readonly',
    $ref: 'readonly',
    $computed: 'readonly',
    $shallowRef: 'readonly',
    $customRef: 'readonly',
    $toRef: 'readonly'
  },
  extends: [
    'plugin:vue/vue3-essential',
    // "eslint:recommended",
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json',
    './.eslintrc-pl-global.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-var': 1, //不使用var
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', //生产环境不能用console.log()
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', //生产环境不能用debugger
    'no-undef': 'error', // 变量未声明就使用
    'no-empty': 'warn', // 块语句的内容不能为空,warn警告
    'no-extra-semi': 2, // 禁止多余的冒号
    'prefer-const': 1, // 授权const
    'no-useless-escape': 'warn',
    semi: [2, 'always'],
    quotes: [
      'error',
      'double',
      { avoidEscape: true, allowTemplateLiterals: true }
    ], //单双引号
    eqeqeq: 2, //必须使用全等
    // "comma-dangle": [ // 关掉 拖尾逗号 校验
    //   "warn",
    //   {
    //     arrays: "always-multiline",
    //     objects: "always-multiline",
    //     exports: "never",
    //     functions: "never",
    //   },
    // ],
    indent: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', args: 'after-used' }
    ],
    'vue/html-selft-closing': 0,
    'vue/multi-word-component-names': 0,
    'vue/singleline-html-element-content-newline': 'off',
    // "space-before-function-paren": [
    //   "error",
    //   { anonymous: "always", named: "never", asyncArrow: "always" },
    // ],
    'space-before-function-paren': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4,
        multiline: {
          max: 4
        }
      }
    ],
    'vue/v-on-event-hyphenation': [
      'warn',
      'always',
      {
        autofix: true,
        ignore: []
      }
    ],
    'vue/html-indent': 'off',
    // "vue/html-indent": [
    //   "warn",
    //   2,
    //   {
    //     attribute: 1,
    //     baseIndent: 1,
    //     closeBracket: 0,
    //     alignAttributesVertically: true,
    //     ignores: ["VAttribute"],
    //   },
    // ],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'ignore'
      }
    ]
  }
})
```
