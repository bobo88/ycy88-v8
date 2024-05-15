# Monorepo

## 一、背景

业务越来越复杂，项目体积越来越大，重复的包管理，重复的配置等导致项目维护成本增加。为了提高公共模块的复用和配置的统一性。

## 二、什么是 Monorepo

Monorepo 是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块/包 (package)，不同于常见的每个模块建一个 repo。

## 三、Monorepo 和 Multirepo

- Multirepo：分散式管理，指定的是不同的项目由不同的仓库来存放管理，每个仓库都维护各项目的 npm 包依赖
- Monorepo：集中式管理，指包含多个项目的单个仓库，各个项目可以单独运行，打包，发布，可以共用根目录下的 npm 包依赖，也可以配置不同项目的单独包依赖

## Multirepo

### 优点

1. 简单明朗
2. 灵活，项目发布修改不会影响到其他项目，稳定性更加有保障
3. 职责清晰互不干扰

### 缺点

1. 项目之间难以建立联系
2. 配置重复，需要维护多个配置
3. 配置之间难以统一
4. 共用模块无法共享，只能通过发布 npm 包的形式去引用，但是又会增加 npm 包版本的维护

## Monorepo

### 优点

1. 统一管理配置，不需要重复配置环境.webpack vite package.json 等可以统一配置
2. 共享 node_module 包 依赖只需要装一次
3. 部署时间快，因为在同一个 repo 里面，不要 pull 到每个单独的 Multirepo 里面去
4. 良好的代码共享，公共模块的封装可以共享，比如工具函数，axios 的封装，业务组件的封装等
5. 开发便利，新建项目方便，无需重复的复制代码。

### 缺点

1. 巨石项目下载 git clone、git fetch、git push、git status 等都会因为文件数激增变得缓慢。
2. 稳定性欠缺，修改不同的项目可能发布或者提交代码的时候会影响到其他无关的项目
3. 由于项目间随意互相引用造成耦合性增加，由于代码放都放一起，可能也会造成项目间职责不明确，代码组织性降低
4. 项目结构相对来说复杂，因为一个 repo 包含多个项目。
5. 权限问题，所有代码都可见。

## 四、Monorepo 实现方式

- bazel
- lerna+yarn/npm
- pnpm

## 五、pnpm 和 lerna+yarn 比较

使用 lerna+yarn 组合，也可以实现 Monorepo 项目管理。但是相比来说，更推荐 pnpm workspace 来管理。

## pnpm 的优点

- 快速：pnpm 会将包缓存到本地，减少二次安装需要的时间。
- 节省磁盘空间：他会把包软链到项目本地，不需要反复安装。
- 节省网络带宽：同样的道理
- 更好的依赖处理逻辑

## lerna+yarn 的缺点

当使用 npm 和 yarn 时，如果你有 100 个项目使用了某个依赖，就会有 100 份该依赖的副本保存在硬盘上，而在使用 pnpm 时，依赖会被存储在内容可寻址的存储中。

- 如果你用到了某依赖项的不同版本，只会将不同版本间有差异的文件添加到仓库。 例如，如果某个包有 100 个文件，而它的新版本只改变了其中 1 个文件。那么 pnpm update 时只会向存储中心额外添加 1 个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。

- 所有文件都会存储在硬盘上的某一位置。 当软件包被安装时，包里的文件会硬链接到这一位置上对应的文件，而不会占用额外的磁盘空间。 这允许你跨项目地共享同一版本的依赖。

## 六、pnpm + workspace 实践

- 通过 pnpm + workspace 实现 Monorepo（单一代码库）管理代码。
- 大版本库，版本包括以下子项目 yh-pc-web,yh-h5-web,yh-admin
- 所有子版本可以共用根目录下的 package.json 安装的 node_module,也可以单独安装自己项目独立的 node_module 包
- 每个项目都可以独立运行，独立打包上线

## 先上最终项目结构

YHWL
-yh-admin
-yh-pc-web
-yh-h5-web
-package.json
-pnpm-workspace.yaml
如上图，我们最终要创建如上图的一个项目结构，其中 YHWL 是根目录，yh-admin、yh-pc-web、yh-h5-web 等的都是子项目

## 根目录 YHWL 下创建 pnpm-workspace.yaml

pnpm 本身就支持 workspace 无需任何的插件，只需要在根目录下创建 pnpm-workspace.yaml.
pnpm-workspace.yaml 配置如下

```sh
packages:
  # 子项目 yh-pc-web,yh-h5-web
  - "yh-pc-web"
  - "yh-h5-web"
  - "yh-admin"
  # 不包括在 test 文件夹下的 package
  - "!**/test/**"
```

## 根目录 YHWL 下创建 package.json

将所有的子项目公共包都放到根目录下的 package.json 下，每个项目单独的包放在子项目的根目录下，package.json 的配置如下

```js
{
  "name": "yh-web",
  "version": "0.0.0",
  "private": true,
  //workspaces的配置
  "workspaces": [
    "yh-pc-web",
    "yh-h5-web",
    "yh-admin"
  ],
  //每个子项目的运行配置命令
  "scripts": {
    "dev:pc": "pnpm -C ./yh-pc-web dev",
    "dev:h5": "pnpm -C ./yh-h5-web dev",
    "dev:admin": "pnpm -C ./yh-admin dev",
    "prod": "vue-tsc --noEmit --skipLibCheck && vite build",
    "build:pc": "pnpm -C ./yh-pc-web build",
    "build:h5": "pnpm -C ./yh-h5-web build",
    "build:admin": "pnpm -C ./yh-admin build",
    "test": "vue-tsc --noEmit --skipLibCheck && vite build --mode test",
    "report": "vue-tsc --noEmit --skipLibCheck && vite build --mode report",
    "preview": "vite preview",
    "lint": "eslint. --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "axios": "^1.3.4",
    "pinia": "^2.0.32",
    "vue": "^3.2.47",
    "vue-router": "^4.1.6",
    ...
  },
  "devDependencies": {
    "@rollup/plugin-inject": "^5.0.3",
    "vite": "^4.1.4",
    ...
  }
}

```

## 项目初始化插件

1. 安装公共的 node_module 所有项目通用

```js
//全局安装
pnpm i -w

//全局安装开发依赖
pnpm i -wD
```

2. 单独安装某个项目的 node_module 项目,以 yh-h5-web 为列

```js
//方式一:进到当前子项目目录
pnpm i

//方式二:根目录进行安装,这个命令暂时有些版本不支持，总是报错No projects matched the filters
pnpm i --filter "yh-h5-web"

//方式三:根目录进行安装,可以安装成功，但是官网不推荐这个方式
pnpm i --prefix "yh-h5-web"

```

## 项目开发环境启动

每个项目都可以单独启动，可以通过根目录命令启动，也可以单独进入到每个项目的目录启动

1. 根目录下启动各个子项目的命令如下:

```js
//根目录下启动yh-h5-web
pnpm dev:h5

//根目录下启动yh-pc-web
pnpm dev:pc

//根目录下启动yh-admin
pnpm dev:admin

```

2. 当前项目目录下启动各个子项目

```js
//进入到每个子项目的目录
pnpm dev
```

## 项目上线打包

1. 根目录下打包各个子项目的命令如下:

```js
// 根目录下打包yh-h5-web
pnpm build:h5

// 根目录下打包yh-pc-web
pnpm build:pc

// 根目录下打包yh-admin
pnpm build:admin

```

2. 当前子项目目录下打包

```js
pnpm build
```

## 测试环境打包

1. 根目录下打包各个子项目的命名如下:

```js
// 根目录下打包yh-h5-web
pnpm test:h5

// 根目录下打包yh-pc-web
pnpm test:pc

// 根目录下打包yh-admin
pnpm test:admin

```

2. 当前子项目目录下打包

```js
pnpm test
```

## 性能分析报告生成

1. 根目录下打包各个子项目的命名如下:

```js
// 根目录下打包yh-h5-web
pnpm report:h5

// 根目录下打包yh-pc-web
pnpm report:pc

// 根目录下打包yh-admin
pnpm report:admin

```

2. 当前子项目目录下打包

```js
pnpm report
```
