# Nginx 实践 2

::: tip Nginx
Nginx 是一个高性能的 Web 和反向代理服务器。
:::

## 一、配置页面重定向

```Bash
# 核心代码片段
server {
    location =/ {
        rewrite ^(.*)$ https://www.ycy88.com;
    }
}
```

当在浏览器输入 ycy88.com 后，它会自动定向到 https://www.ycy88.com。

## 二、完整的项目代理配置

```Bash
# ========= 配置 https://docs.ycy88.com =============
server {
    listen       443 ssl;
    server_name  docs.ycy88.com;  # 值为 _ 表示 域名和ip都能访问

    ssl_certificate "/usr/local/nginx/cert/docs.pem";  # ssl的.pem文件（绝对地址）
    ssl_certificate_key "/usr/local/nginx/cert/docs.key";  # ssl的.key文件（绝对地址）
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 配置文件上传大小
    client_max_body_size 2G;

    location / {
        root   web/docs-web/docs/.vuepress/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
        autoindex on;
        gzip on;
        gzip_types application/javascript text/css;
        gzip_vary on; # 是否传输gzip压缩标志
        add_header Access-Control-Allow-Origin '*';
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, OPTIONS';
        add_header Access-Control-Expose-Headers 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range';
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
# ========= 配置 docs.ycy88.com 重定向到 https://docs.ycy88.com =============
server {
    listen       80;
    server_name docs.ycy88.com;

    location =/ {
        rewrite ^(.*)$ https://docs.ycy88.com;
    }
}
```

## 三、常见命令

```bash
# nginx -s reload  # 重启nginx
```
