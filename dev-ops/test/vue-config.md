# Nginx 配置实践

## 一、VUE 项目页面刷新问题

VUE 项目部署页面刷新后出现 404 或者无法正常访问的情况，是因为路由匹配不找到。

如果你希望 Nginx 可以正确识别路径不带 .html 的情况，且 Nginx 能够兼容用户输入 .html 后缀的请求，并且也能正确显示页面。

则具体配置如下：

```bash
location / {
    # 你的具体项目部署路径地址
    root   web/ABC/dist;
    # 尝试查找文件，包括带.html后缀和不带后缀的文件，如果找不到，则重定向到 @rewrite
    try_files $uri $uri.html $uri/ @rewrite;
    index index.html;
    autoindex on;
    gzip on;
    gzip_types application/javascript text/css;
    gzip_vary on; # 是否传输gzip压缩标志
    add_header Access-Control-Allow-Origin '*';
    add_header Access-Control-Allow-Methods 'GET, POST, PUT, OPTIONS';
    add_header Access-Control-Expose-Headers 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range';
}

location @rewrite {
    rewrite ^(.*)\.html$ $1 last;  # 将带.html后缀的请求重写为不带后缀的请求
}
```
