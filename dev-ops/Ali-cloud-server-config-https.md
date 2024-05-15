# 阿里云服务器配置 https

::: tip
最近在捣鼓微信小程序，虽然几年前在公司也做过一些小程序，但是都是开发的内部测试体验版，没有涉及到正式版，所以也就没有强制要求所有接口都必须是 HTTPS 的。

但最近想弄个正式版的玩一玩，所以本文主要介绍下「阿里云服务器是如何配置 https」的。
:::

## 一、域名申请（购买域名）

控制台 -> 域名 -> 域名注册 -> 选择域名，按页面提示输入相关信息 -> 等待实名认证通过

入口：<a href="https://wanwang.aliyun.com/domain/" target="_blank">阿里云 - 注册域名</a><br />

## 二、申请 ssl 证书（有免费证书）

ssl 证书控制台 -> 申请免费证书 -> 按页面提示，填入相关信息 -> 验证信息 -> 等待验证通过

### 申请免费证书

![An image](/images/tools/tools_aliyun.jpeg)

### 证书下载，需要上传到阿里云服务器里面

我是下载的 Nginx 相关的，并部署到 nginx 的 cert 目录（自定义的）。
![An image](/images/tools/tools_aliyun2.png)

### 配置安全组

![An image](/images/tools/tools_aliyun3.png)

### 三、Nginx 配置

```js
server {
    listen       443 ssl;
    server_name  _;  # 值为 _ 表示 域名和ip都能访问

    ssl_certificate "/usr/local/nginx/cert/server.pem";  # ssl的.pem文件（绝对地址）
    ssl_certificate_key "/usr/local/nginx/cert/server.key";  # ssl的.key文件（绝对地址）
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 配置文件上传大小
    client_max_body_size 2G;

    location / {
        root   web/nuxt-web/build;
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
```

::: danger 但是因为我之前已经安装和配置好了 nginx，所以重启 nginx 的时候，会报错。
nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module
:::

原因就是：证明 nginx 在编译安装时候没有连同 http_ssl_module 模块一同编译；现在的情况是 nginx 已经安装过了，需要重新编译，编译安装的时候带上--with-http_ssl_module 配置。

```js
// 1. 修改前
$ sudo nginx -V
nginx version: nginx/1.16.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC)
configure arguments:

// 2.切换到源码包

// 3.进行编译：
sudo ./configure --with-http_stub_status_module --with-http_ssl_module

// 4.配置完成后，运行命令：
sudo make
// ======== 注意： 如果碰到 make报错“-bash: ./configure: No such file
// 解决思路：先定位到根目录，使用find -name configure找到目录，然后cd到该目录即可

// 5.make命令执行后，不要进行make install，否则会覆盖安装。

// 6.备份原有已安装好的nginx：
sudo cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
sudo ls -l /usr/local/nginx/sbin/

// 7.停止nginx状态：
ps -aux|grep nginx
sudo kill -9 <PID>
// ========================= Tip： PID是哪个值 =======================================
// UID        PID  PPID  C STIME TTY          TIME CMD
// root         1     0  0 Jun10 ?        00:18:03 /usr/bin/python /usr/bin/supervisord
// root        16     1  0 Jun10 ?        00:00:00 /usr/sbin/sshd -D
// root        17     1  0 Jun10 ?        00:00:19 php-fpm: master process (/etc/php-fpm.conf)


// 8.将编译好的nginx覆盖掉原有的nginx：
sudo cp ./objs/nginx /usr/local/nginx/sbin/

// 9.提示是否覆盖，输入yes即可。

// 10.然后启动nginx：
/usr/local/nginx/sbin/nginx

// 11.有以下提示，证明已经编译成功：
$ sudo nginx -V
nginx version: nginx/1.16.1
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC)
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --with-http_stub_status_module --with-http_ssl_module

// 12. 重启 Nginx
```

## 四、效果截图

![An image](/images/tools/tools_aliyun4.png)
![An image](/images/tools/tools_aliyun5.png)

参考：<br />
<a href="https://www.jianshu.com/p/f00c37ff6077" target="_blank">阿里云服务器配置 https</a><br />
<a href="https://www.jianshu.com/p/600e398fe88d" target="_blank">nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module</a><br />
