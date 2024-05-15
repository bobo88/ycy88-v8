# SaaS 平台前端实现预研

::: tip 核心功能点概述

1. 框架选型：技术栈（VUE3） / UI 组件库（ElementPlus 或基于 ElementPlus）...
2. 逻辑封装：接口请求封装...
3. 公共组件：菜单/搜索/新增/编辑/查看/导出/禁用/上传...
4. xx

:::

## 一、项目目标

- 系统 SaaS 化，框架整体升级替换
- 增加数据可视化智慧大屏功能

##### 备注： SaaS 分为 商业 SaaS 和 工具 SaaS。

## 二、实现功能

- 基础功能
  - 登录功能与修改密码功能：个人信息 / 修改密码 / 账号绑定 / 隐私设置
  - 系统管理功能
    - 机构管理
    - 用户管理 / 用户认证
    - 角色管理 / 角色权限
    - 菜单管理
    - 字典管理
    - 工作流管理
    - 操作日志
    - 系统日志
    - 系统配置
    - 应用授权
- 核心功能
  - xxg
  - xx
- 公共功能
  - 条件搜索查询
    - 输入框
    - 选择下拉框（单选/多选）
    - 日期选择框
  - 消息通知
  - 个人中心
  - 基于业务模型的增删改查
    - 新增页 add
    - 列表页 list
    - 详情页 detail
    - 编辑页 edit
    - 业务操作按钮：查看、编辑、删除、禁用、上传、导出...
- 业务功能
  - 工作台
  - 项目管理
  - ......
- 其他
  - ......

## 三、开展策略

### 3.1 技术选型与架构设计

- 前端框架选型
  - VUE3
  - UI 组件库（基于 Element Plus 二次开发 或 Element Plus）
  - 框架 A: vben-admin 是一个基于 Vue3.0、Vite、 Ant-Design-Vue 、TypeScript 的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。
    - [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)
  - 框架 B: [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)
  - 框架 C: [vue-admin-better](https://github.com/chuzhixin/vue-admin-better)
    - 🔥 ✨✨ ✨ Vue3+Vite4+Element-Plus+TypeScript 编写的一款后台管理系统（兼容移动端）
    - [vue-admin-beautiful](https://vue-admin-beautiful.com/admin-plus/#/dashboard)
    - [vue-admin-beautiful](https://vue-admin-beautiful.com/vue-admin-arco/#/dashboard/workplace)
  - 框架 D: [vue3-antd-admin](https://github.com/buqiyuan/vue3-antd-admin)
    - 基于 vue-cli5.x/vite2.x + vue3.x + ant-design-vue3.x + typescript hooks 的基础后台管理系统模板 RBAC 的权限系统, JSON Schema 动态表单,动态表格,漂亮锁屏界面
  - ~~Vue element admin - 老牌 admin 后台管理 求稳首选~~（技术栈是 VUE2）
  - ~~Antd Pro Vue - 背靠阿里，代码过硬，大型项目首选~~（技术栈是 VUE2）
    - ~~Github： [ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro)~~
  - ....
- 架构设计
- 数据库设计
- 接口设计
- ...

### 3.2 技术演进在本项目的穿插落地

- 前端基础建设：前端沉淀一套可快速开发、封装通用组件，可以应用于其他业务场景的后台管理系统；
  - 权限控制设计
    - 基于 RBAC 模型的权限设计，用户->角色->权限
  - 动态路由菜单加载
  - api 接口规范
  - 公共组件抽离沉淀
    - 动态表单域(30%)。
    - 数据列表 — 表卡(28%)。
    - 图表(10%)。
    - 集群数据列表(10%)。
    - 简介(6%)。
    - 定制(4%)。
    - 自定义小部件 (4%)。
    - 内容(8%)
    - 备注：这些是主要组件,这意味着如果我们将每个组件构建为可配置并涵盖每个页面/业务的所有种类,那么我们完成了超过 70% 的任何平台,我们可以专注于主要业务,即 30 %。
  - 兼顾长期演进
- 前端基础建设：数据可视化能力沉淀；
  - 大屏可视化

### 3.3 功能清单

### 3.4 明确核心交付物

### 3.5 关键节点

## 四、交付成果

## 五、计划制定

## 六、参考地址

- [微前端在网易七鱼的实践](https://www.sohu.com/a/438608052_100189839)
- [微前端 - 插拔式架构，SaaS 产品定制化](https://www.jianshu.com/p/c0172a917904)
