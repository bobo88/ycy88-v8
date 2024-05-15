# npm 切换源

### 1. 查看当前的源：

```bash
npm config get registry
```

### 2. 切换为官方源：

```bash
npm config set registry https://registry.npmjs.org/
```

### 3. 切换为淘宝源：

```bash
npm config set registry https://registry.npm.taobao.org/
```

<!-- ### 4. 切换为 cnpm 源（需要先安装 cnpm）：

```bash
npm config set registry https://registry.npm.taobao.org/
``` -->

<!-- 注意：切换源可能会导致一些依赖包无法下载或者下载速度变慢，建议在网络环境较好的情况下切换源。 -->
