# Nginx 设置资源访问限制

<!-- ::: tip Nginx 设置资源访问限制
Nginx 设置资源访问限制
::: -->

## 一、React 项目配置路由

> 将限制访问的路由页面配置好。

```js
import React, { lazy } from 'react'

// 懒加载路由
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/about/About'))
// 其他：略

const routes = [
  {
    key: 'index',
    path: '/',
    element: <Home />
  },
  {
    key: 'protected',
    path: '/protected',
    element: <About />
  }
  // （略）
]

export default routes
```

## 二、安装 `htpasswd` 工具

`httpd-tools` 包通常是 Apache HTTP 服务器的一部分，并包含 `htpasswd` 工具。要安装 `httpd-tools`，您需要安装 Apache HTTP 服务器的相关软件包。

如果您使用的是基于 `apt` 包管理的 Linux 发行版（如 Ubuntu、Debian），可以使用以下命令安装 `apache2-utils` 包，该包包含 `htpasswd` 工具：

```bash
sudo apt-get update
sudo apt-get install apache2-utils
```

如果您使用的是基于 `yum` 包管理的系统（如 CentOS、Red Hat），可以使用以下命令安装：

```bash
sudo yum install httpd-tools
```

安装完成后，您就能够使用 `htpasswd` 命令了。

## 三、使用 `htpasswd` 创建的密码文件

> 密码文件是来进行基本身份验证。

```bash
htpasswd -c /psw/.htpasswd username
```

这将提示您输入密码，并将用户名和加密后的密码存储在 `/psw/.htpasswd` 文件中。如果文件已存在，使用 `-c` 选项会创建一个新文件，覆盖旧文件。

![An image](/images/dev-ops/htpasswd.png)

## 四、Nginx 配置

### 1）修改 Nginx 配置文件

```nginx
server {
    listen       80;
    server_name yb.ycy88.com;

    location / {
        # （略）
    }

    location /protected {
        auth_basic "需要输入用户名和密码：";
        auth_basic_user_file ../psw/.htpasswd;
        # （略）
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

### 2）重启 Nginx

```bash
sudo nginx -s reload
```

## 五、访问页面查看效果

### 1）访问限制页面

![An image](/images/dev-ops/htpasswd-tc.png)

### 2）输入正确的用户名和密码

> username / bob

![An image](/images/dev-ops/protected-res.png)

- [DEMO 地址：Nginx 设置资源访问限制](http://yb.ycy88.com/protected)
