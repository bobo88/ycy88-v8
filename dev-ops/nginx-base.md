# Nginx 基础知识

::: tip Nginx
Nginx
:::

## 一、Nginx 是什么

### 1）概念

Nginx（发音"engine x"）是一个开源且高性能的 Web 服务器，也可以用作反向代理服务器、负载均衡器、HTTP 缓存以及作为邮件代理服务器。由俄罗斯的程序设计师 Igor Sysoev 创建，并于 2004 年首次公开发布。

- Nginx 主要使用 C 语言进行开发。

### 2）作用

- **Web 服务器：** 提供静态文件服务、处理静态 HTML 页面以及其他资源。
- **反向代理服务器：** 接收客户端的请求，并将请求转发给后端的应用服务器。
- **负载均衡器：** 分发流量到多个服务器，以提高系统的性能和可用性。
- **HTTP 缓存服务器：** 缓存静态资源，减轻后端服务器的负担，提高访问速度。
- **邮件代理服务器：** 作为邮件服务器，处理邮件的收发。

## 二、Nginx 怎么用

### 1）常见实现方式

- **静态资源服务：** 作为静态资源服务器，提供静态文件服务。
- **SSL/TLS 配置：** 配置为提供安全的 HTTPS 服务。
- **负载均衡配置：** 将请求分发给多个后端服务器，提高系统的可用性和性能。
- **反向代理配置：** 将请求转发给后端的应用服务器。
- **动态内容处理：** 配合其他后端应用服务器处理动态内容。
- **日志记录：** 记录访问日志、错误日志等。
- **高级配置：** 包括缓存配置、gzip 压缩、安全策略配置等。

### 2）具体设置

#### 静态资源服务

```nginx
server {
    listen 80;
    server_name example.com;

    location /static/ {
        alias /path/to/static/files/;
        expires 30d;
    }

    location /images/ {
        alias /path/to/image/files/;
        expires max;
    }

    # Other configurations...
}
```

#### SSL/TLS 配置

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    location / {
        # Other configurations...
    }
}
```

#### 负载均衡配置

```nginx
upstream backend_servers {
    server backend_server1;
    server backend_server2;
    # Add more backend servers as needed
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend_servers;
        # Other proxy settings...
    }
}
```

#### 反向代理配置

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 动态内容处理

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        fastcgi_pass unix:/var/run/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

#### 日志记录

```nginx
http {
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;

    # Other configurations...
}
```

#### 高级配置

Nginx 支持丰富的高级配置，包括缓存配置、gzip 压缩、安全策略配置等。根据实际需求，可以深入了解 Nginx 的配置语法和高级功能。

## 三、Nginx 的优劣势

### 优势

- **高性能：** Nginx 采用异步非阻塞的事件驱动架构，具有出色的性能，可以处理大量并发连接。
- **低资源消耗：** Nginx 的内存消耗相对较低，适合在资源有限的环境中运行。
- **可扩展性：** Nginx

可以通过模块化的方式扩展功能，支持多种第三方模块。

- **负载均衡：** Nginx 内建了负载均衡功能，可以将请求分发到多个后端服务器，提高系统的稳定性和性能。
- **反向代理：** Nginx 可以作为反向代理服务器，将请求转发给后端的应用服务器。

### 劣势

- **不支持动态内容处理：** Nginx 的主要设计目标是处理静态内容和反向代理，对于动态内容的处理相对有限，需要借助其他后端应用服务器。
- **配置相对复杂：** 高级的配置可能需要深入了解 Nginx 的配置语法和工作原理。

## 四、其他备注

### 1）什么是正向代理？什么是反向代理？

> 正向代理和反向代理是两种代理服务器的工作模式，它们的区别主要体现在代理的对象和代理的目的。

1. **正向代理（Forward Proxy）：**

   - **代理对象：** 正向代理代理的是客户端（用户），客户端通过正向代理访问目标服务器。
   - **目的：** 主要用于隐藏真实客户端，访问互联网，或者访问其他受限制的资源。客户端通过正向代理向代理服务器发送请求，然后代理服务器将请求转发给目标服务器，最后将目标服务器的响应返回给客户端。

2. **反向代理（Reverse Proxy）：**

   - **代理对象：** 反向代理代理的是服务器，客户端通过反向代理访问服务器。
   - **目的：** 主要用于提供负载均衡、安全性和简化客户端访问的场景。客户端通过反向代理向代理服务器发送请求，反向代理服务器根据负载均衡算法选择一个目标服务器，将请求转发给目标服务器，最后将目标服务器的响应返回给客户端。

总结：

- 正向代理代理的是客户端，目的是隐藏客户端身份，访问互联网资源。
  - 常见场景：翻墙 VPN
- 反向代理代理的是服务器，目的是提供负载均衡、安全性和简化客户端访问。
  - 常见场景：（略）
