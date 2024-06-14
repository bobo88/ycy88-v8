# Express 项目如何部署？

## 一、项目上传到阿里云服务器

> 1）你可以使用 scp 命令将项目上传到服务器：

```bash
$ scp -r /path/to/your/project root@your_server_ip:/path/to/destination
```

> 2）或者你可以直接在服务器上克隆你的 Git 仓库：

```bash
$ git clone https://github.com/yourusername/your-repo.git
```

> 3）或者直接 FTP 上传到服务器。

## 二、安装依赖

```bash
$ yarn
```

![An image](/images/node/express-install.png)

<!-- ![An image](/images/node/express-run.png) -->

## 三、PM2 启动运行

```bash
$ pm2 start yarn --name express-tools -- start
```

![An image](/images/node/express-pm2.png)

## 四、配置代理

```bash
# 其他略...
location /apis/ {
  add_header      Access-Control-Allow-Origin '*';
  add_header      Access-Control-Allow-Headers "Accept, X-Token, Content-Type";
  add_header      Access-Control-Allow-Methods "GET, POST, DELETE, PATCH, PUT, OPTIONS";
  proxy_pass      http://localhost:3000/;
}
```

![An image](/images/node/express-nginx.png)
