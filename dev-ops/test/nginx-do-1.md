# Nginx 实践

::: tip Nginx 实践
Nginx 实践
:::

## 一、常见操作

### 1）访问出现错误，配置跳转

> 避免出现页面访问空白，提高用户体验度。

在 Nginx 中，可以通过配置 `error_page` 指令来实现在项目部署时无法访问时的跳转。这通常涉及使用状态码来识别特定的错误情况，并将请求重定向到其他地方。以下是一个简单的示例：

```nginx
server {
    listen 80;
    server_name your_domain.com;

    root /path/to/your/project;

    location / {
        try_files $uri $uri/ /index.html;
        # 这里假设项目入口文件是 index.html
    }

    error_page 404 /error404.html;
    # 当发生 404 错误时，重定向到自定义的 error404.html 页面

    error_page 500 502 503 504 /error50x.html;
    # 当发生 500、502、503、504 错误时，重定向到自定义的 error50x.html 页面

    location = /error50x.html {
        root /path/to/your/error/pages;
    }

    location = /error404.html {
        root /path/to/your/error/pages;
    }
}
```

在上述配置中：

- `try_files` 指令用于尝试在当前请求的上下文中查找文件，如果找不到则将请求传递给指定的 URI。这里假设项目的入口文件是 `index.html`。
- `error_page` 指令用于配置当发生特定状态码的错误时，将请求重定向到指定的 URI。在示例中，当发生 404 错误时，重定向到 `/error404.html`。
- `location` 块用于配置指定 URI 的位置，例如 `/error404.html` 和 `/error50x.html`。
- `root` 指令用于指定文件的根目录，这里是指错误页面的根目录。

你需要根据实际的项目结构和需求进行相应的调整。确保在 Nginx 重新加载配置后，修改会生效。

### 2）设置缓存

> 配置 Nginx 缓存，提高访问速度。

要在 Nginx 中设置缓存，通常需要使用 `proxy_cache` 指令。下面是一个简单的配置示例，演示如何设置反向代理缓存：

```nginx
http {
    # 定义缓存路径和配置
    proxy_cache_path /path/to/cache levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m;

    server {
        listen 80;
        server_name example.com;

        location / {
            # 开启缓存
            proxy_cache my_cache;
            # 缓存的有效时间
            proxy_cache_valid 200 304 10m;
            # 不缓存的响应状态码
            proxy_cache_valid 301 1h;
            proxy_cache_valid any 1m;
            # 设置缓存的 key
            proxy_cache_key "$scheme$request_method$host$request_uri";

            # 反向代理配置
            proxy_pass http://backend_server;
        }
    }
}
```

上述配置中：

- `proxy_cache_path` 定义了缓存路径和配置。
- `proxy_cache` 开启了缓存，`my_cache` 是缓存的名称，与 `proxy_cache_path` 中的 `keys_zone` 参数一致。
- `proxy_cache_valid` 定义了缓存的有效时间，可以根据实际需求进行调整。
- `proxy_cache_key` 定义了缓存的 key，这里使用了一些变量来生成一个唯一的缓存 key。

在实际使用中，可以根据具体的需求进行更灵活的配置。缓存的设置有助于提高访问速度，尤其是对于一些相对稳定的内容，如静态资源或接口返回的数据。

### 3）限速配置：

> 配置请求速率限制，控制访问频率。

在 Nginx 中进行请求速率限制可以使用 `limit_req` 指令。以下是一个简单的配置示例，演示如何设置请求速率限制：

```nginx
http {
    limit_req_zone $binary_remote_addr zone=my_limit:10m rate=5r/s;

    server {
        listen 80;
        server_name example.com;

        location / {
            # 启用请求速率限制
            limit_req zone=my_limit;

            # 反向代理配置
            proxy_pass http://backend_server;
        }
    }
}
```

上述配置中：

- `limit_req_zone` 定义了请求速率限制的区域，其中 `$binary_remote_addr` 是用于区分不同客户端的关键字，`zone=my_limit:10m` 表示限制的区域名称为 `my_limit`，最大内存占用为 10MB，`rate=5r/s` 表示允许每秒钟处理 5 个请求。
- `limit_req` 启用了请求速率限制，使用了前面定义的 `my_limit` 区域。

这样配置后，Nginx 将对每个客户端的请求进行速率限制，确保在设定的速率内进行访问。这有助于防止某个客户端或 IP 地址发起过多的请求，以保障服务器的正常运行。

### 4）防盗链配置：

> 配置 Nginx 防止盗链，限制图片等资源的外部访问。

Nginx 可以通过配置防盗链来限制图片等资源的外部访问。以下是一个简单的配置示例，演示如何设置防盗链：

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /images/ {
        valid_referers none blocked yourdomain.com;
        if ($invalid_referer) {
            return 403;
        }

        # 允许指定的文件类型
        location ~ \.(gif|jpg|jpeg|png)$ {
            expires 30d;
        }
    }

    # 其他配置...
}
```

上述配置中：

- `valid_referers` 指定了允许的引用者，`none` 表示不允许任何引用，`blocked` 表示允许直接访问，`yourdomain.com` 表示允许指定域名的引用。
- `if ($invalid_referer)` 检查引用者是否为允许的范围，如果不是则返回 403 状态码。
- `location ~ \.(gif|jpg|jpeg|png)$` 指定了允许的文件类型，对于这些文件类型设置了 `expires`，以便在客户端进行缓存。

这样配置后，只有指定域名的请求才能正常访问 `/images/` 目录下的图片文件，其他引用者将会被拒绝。这有助于防止图片等资源被盗链到其他网站。

### 5）配置基本身份验证：

> 配置 Nginx 进行基本的身份验证。

Nginx 可以通过配置基本身份验证来增加对资源的访问限制。以下是一个简单的配置示例，演示如何设置基本身份验证：

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /protected {
        auth_basic "Restricted Access";
        auth_basic_user_file /etc/nginx/.htpasswd;

        # 其他配置...
    }

    # 其他配置...
}
```

上述配置中：

- `location /protected` 指定了需要进行身份验证的路径为 `/protected`。
- `auth_basic "Restricted Access";` 设置了身份验证提示信息为 "Restricted Access"，可根据需求自定义。
- `auth_basic_user_file /etc/nginx/.htpasswd;` 指定了存储用户名和密码的文件路径。该文件可以通过 `htpasswd` 工具生成，例如：`htpasswd -c /etc/nginx/.htpasswd username`。

这样配置后，访问 `/protected` 路径时，用户将会被提示输入用户名和密码，只有提供正确的凭证才能访问该路径下的资源。

注意：在实际使用中，请根据安全需求合理配置身份验证，并确保存储用户名和密码的文件的权限设置得当。

## 二、其他备注

### 1）全局安装 httpd-tools

> 与「配置基本身份验证」相关。

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

安装完成后，您就能够使用 `htpasswd` 命令了。确保检查系统上使用的包管理工具，并使用适用于您系统的相应命令。
